import fetch from 'node-fetch';
import fs from 'fs';
import { finished } from 'stream/promises';
import IBananaInstallerOptions from './options.interface';
import path from 'path';
import { Stream } from 'stream';

export default class GsNodemodBananaInstaller {
  public constructor(private readonly options: IBananaInstallerOptions) {}

  public async installCollection(id: number) {
    const cacheName = `${this.options.targetFolder}/collection_${id}.txt`;
    const installed = await fs.promises.readFile(cacheName)
      .then((buffer) => buffer.toString().split('\n'), () => []);

    // fetch items from collection
    let isComplete = false;
    let page = 1;
    while (!isComplete) {
      const response: any = await fetch(`https://gamebanana.com/apiv11/Collection/${id}/Items?_nPage=${page}`)
        .then(v => v.json());
      
      isComplete = response._aMetadata._bIsComplete;
      page++;

      for (const item of response._aRecords) {
        if (installed.includes(item._idRow.toString())) {
          console.log(`Skip ${item._sName}`);
          continue;
        }

        console.log(`Install ${item._sName}...`);
        await this.install(item._idRow);

        installed.push(item._idRow.toString());
        await fs.promises.writeFile(cacheName, installed.join('\n'));
      }
    }
  }

  public async install(id: number) {
    const { fileId, fileName, fileList } = await this.getFileInfo(id);
    const prefix = this.getPrefix(fileList);
    const isStructured = this.isStructured(prefix, fileList);
    const response = await fetch(`https://gamebanana.com/dl/${fileId}`);

    console.log({prefix, isStructured});
    await this.options.unpack(
      path.extname(fileName),
      response.body,
      async (stream: Stream, entryName) => {
        const paths = [this.options.targetFolder];
        if (!isStructured) {
          paths.push(this.getTargetFolder(entryName));
        }

        paths.push(entryName.replace(`${prefix}/`, '').replace('valve/', ''));
        const targetPath = path.join(...paths);
        console.log(targetPath);

        await this.prepareDir(targetPath);
        const fileStream = fs.createWriteStream(targetPath);
        return finished(stream.pipe(fileStream));
      },
      fileName,
    );
  }

  private getTargetFolder(entryName: string) {
    const extname = path.extname(entryName.toLowerCase());
    const extensions = {
      '.bsp': 'maps',
      '.wav': 'sound',
      '.wad': '',
      '.txt': '',
      '.res': 'maps',
      '.mdl': `model/player/${path.parse(entryName).name}`
    };

    const response = extensions[extname];
    if (response === undefined) {
      throw Error(`invalid entry ${entryName}`);
    }

    return response;
  }

  private isStructured(prefix: string, fileList: string[]) {
    return !!fileList.find(v => v.replace(`${prefix}/`, '').includes('/'));
  }

  private getPrefix(fileList: string[]) {
    const parts = (fileList.find(v => v.includes('/')) || '').split('/');
    if (fileList.length <= 1 || parts.length <= 1) {
      return '';
    }

    const prefix = parts[0];
    if (fileList.find(v => !v.startsWith(prefix))) {
      return;
    }

    return prefix;
  }

  private async prepareDir(filePath: string) {
    await fs.promises.mkdir(path.dirname(filePath)).catch(() => {});
  }

  private async getFileInfo(id: number) {
    const [rawFileInfo] = await fetch(`https://api.gamebanana.com/Core/Item/Data?${new URLSearchParams({
      itemtype: 'Mod',
      itemid: id.toString(),
      fields: [
        'Files().aFiles()'
      ].join(',')
    })}`).then(v => v.json() as Promise<any>);

    const fileId = Object.keys(rawFileInfo)[0];
    const fileName = Object.values(rawFileInfo)[0]['_sFile'];
    const fileList = await fetch(`https://gamebanana.com/apiv11/File/${fileId}/RawFileList`).then(v => v.text()).then(v => v.split('\n'));

    return {
      fileId,
      fileName,
      fileList
    };
  }
}
