export default class PlayersSessionStorage<T = any> {
  private readonly storage = new Map<number, T>();

  public constructor(private readonly init: (entity) => T) {
    nodemod.on('dllClientDisconnect', (entity) => this.delete(entity.id));
  }

  public get(id: number) {
    if (!this.storage.has(id)) {
      const state = this.init(nodemod.eng.pEntityOfEntIndex(id));
      this.storage.set(id, state);
      return state;
    }

    return this.storage.get(id);
  }

  public delete(id: number) {
    return this.storage.delete(id);
  }
}