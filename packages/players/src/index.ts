import PlayersLifeStorage from './life-storage';
import PlayersSessionStorage from './session-storage';
import IDeathContext from './types/death-context.interface';

export { PlayersSessionStorage, PlayersLifeStorage, IDeathContext };
export default class NodemodPlayers {
  private static slots = null;

  public static init() {
    nodemod.on('dllSpawn', (entity) => {
      if (this.slots) {
        return;
      }

      this.slots = Array.from({ length: 16 }).map((_, i) => nodemod.eng.pEntityOfEntIndex(i + 1));
    });
  }

  public static get players() {
    if (!this.slots) {
      return [];
    }

    return this.slots.filter(v => v.netname);
  }
}

NodemodPlayers.init();
