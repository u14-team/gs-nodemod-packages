# @gs-nodemod/banana-installer

## Sample use
init your own constructor, with implemented unpackers
```typescript
import fs from 'fs';
import Unrar from 'unrar';
import { finished } from 'stream/promises';
import GsNodemodBananaInstaller from '@gs-nodemod/banana-installer';
import path from 'path';
import unzipper from 'unzipper';

export default class BananaInstaller extends GsNodemodBananaInstaller {
  public constructor() {
    super({
      targetFolder: path.resolve(nodemod.cwd, 'valve_addon'),
      unpack: (ext, stream, cb, fileName) => {
        if (ext === '.rar') {
          return this.unpackRar(stream, cb, fileName);
        }
    
        if (ext === '.zip') {
          return this.unpackZip(stream, cb);
        }
        
        throw Error('unknown' + ext);
      }
    });
  }

  private async unpackRar(stream, cb, fileName) {
    const writeStream = fs.createWriteStream(`./temp/${fileName}`);
    await finished(stream.pipe(writeStream));
  
    const archive = new Unrar(`./temp/${fileName}`);
    const entries: any[] = await new Promise((res, rej) => archive.list((err, result) => err ? rej(err) : res(result)));
  
    for (const entry of entries) {
      console.log(entry);
      if (entry.type !== 'File') {
        return;
      }
  
      await cb(archive.stream(entry.name), entry.name);
    }
  }
  
  private async unpackZip(stream, cb) {
    const zip = stream.pipe(unzipper.Parse({ forceStream: true }));
    for await (const entry of zip) {
      console.log(entry.type, entry.path);
      if (entry.type !== 'File') {
        entry.autodrain();
        continue;
      }
  
      await cb(entry, entry.path);
    }
  }
}
```

and use it:
```typescript
const bananaInstaller = new BananaInstaller();
await bananaInstaller.installCollection(67190);
// or
await bananaInstaller.install(59758);
```