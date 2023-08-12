export default class NodemodPrecache {
  private static resources = [];
  private static queue = [];

  public static init() {
    nodemod.on('dllSpawn', () => {
      while (this.queue.length) {
        const f = this.queue.pop();
        this.resources.push(f);
        f();
      }
    });

    nodemod.on('dllServerActivate', () => {
      this.queue.push(...this.resources);
      this.resources = [];
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