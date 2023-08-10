export default class NodemodPrecache {
  private static queue = [];

  public static init() {
    nodemod.on('dllSpawn', () => {
      while (this.queue.length) {
        this.queue.pop()();
      }
    });
  }

  public static sound(path: string): Promise<number> {
    return this.precacheResource('precacheSound', path);
  }

  public static model(path: string): Promise<number> {
    return this.precacheResource('precacheModel', path);
  }

  private static precacheResource(method: string, path: string): Promise<number> {
    return new Promise((resolve) => {
      this.queue.push(() => {
        const id: number = nodemod.eng[method](path);
        console.log(`${method}('${path}'); // ${id}`);
        resolve(id);
      });
    });
  }
}

NodemodPrecache.init();