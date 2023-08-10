import { NodemodMessageWatcher } from '@gs-nodemod/messages';
import { EventEmitter } from 'node:events';
import IDeathContext from './types/death-context.interface';

export default class PlayersLifeStorage<T extends unknown> extends EventEmitter {
  private readonly storage = new Map<number, T>();

  public constructor(private readonly init: (entity, oldState?: T) => T) {
    super();

    nodemod.on('dllClientDisconnect', (entity) => this.delete(entity.id));
    NodemodMessageWatcher.on<[number, number, string]>('post:DeathMsg', state => {
      const [killerId, victimId, weapon] = state.values;

      const killer = nodemod.eng.pEntityOfEntIndex(killerId);
      const isSuicide = killerId === 0 || killerId === victimId;
      const context: IDeathContext = {
        killer,
        victim: nodemod.eng.pEntityOfEntIndex(victimId),
        killerState: killerId === 0 ? null : this.get(killerId),
        victimState: this.get(victimId),
        isSuicide,
        isSafeKill: killer.health > 0 && !isSuicide,
        weapon
      };

      this.emit(`death:${victimId}`, context);
      this.emit('death', context);

      this.storage.set(victimId, this.init(
        nodemod.eng.pEntityOfEntIndex(victimId),
        context.victimState
      ));
    });
  }

  public on(name: 'death' | string, cb: (ctx: IDeathContext<T>) => void) {
    return super.on(name, cb);
  }

  public once(name: 'death' | string, cb: (ctx: IDeathContext<T>) => void) {
    return super.once(name, cb);
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