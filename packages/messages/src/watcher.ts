import EventEmmiter from 'node:events';
import MsgPartType from './types/msg-part-type.enum';
import IMessageState from './types/message-state.interface';

const writers = {
  byte: v => nodemod.eng.writeByte(v),
  char: v => nodemod.eng.writeChar(v),
  short: v => nodemod.eng.writeShort(v),
  long: v => nodemod.eng.writeLong(v),
  angle: v => nodemod.eng.writeAngle(v),
  coord: v => nodemod.eng.writeCoord(v),
  string: v => nodemod.eng.writeString(v || ''),
  entity: v => nodemod.eng.writeEntity(typeof v === 'number' ? nodemod.eng.indexOfEdict(v) : v),
};

export default class NodemodMessageWatcher {
  private static state?: IMessageState;
  private static eventEmmiter = new EventEmmiter();

  public static init() {
    nodemod.on('engMessageBegin', (dest, type, origin, entity) => {
      const name = nodemod.getUserMsgName(type);
      if (!this.eventEmmiter.listeners(name).length && !this.eventEmmiter.listeners(`post:${name}`).length) {
        return;
      }

      this.state = { dest, type, name, origin, entity, values: [], types: [], isMessageEnd: false };
    });

    // POST потому что кодер захочет сразу из уведа прислать новое сообщенице
    nodemod.on('engMessageEnd', () => {
      if (!this.state) {
        return;
      }

      const state = this.state;
      this.eventEmmiter.emit(state.name, state);

      this.state.isMessageEnd = true; // чтобы методы записи не вызвались повторно
      this.state.types.map((type, i) => writers[type](this.state.values[i]));
    });

    nodemod.on('postEngMessageEnd', () => {
      if (!this.state) {
        return;
      }

      const state = this.state;
      delete this.state;

      this.eventEmmiter.emit(`post:${state.name}`, state);
    });

    Object.entries(MsgPartType)
      .forEach(([k, v]) => nodemod.on(`engWrite${k}`, value => this.writeValue(value || null, v)));
  }

  public static on<T = (string | number)[]>(name: string, cb: (state: IMessageState<T>) => void) {
    this.eventEmmiter.on(name, cb);
  }

  private static writeValue(value: string | number, type: MsgPartType) {
    if (!this.state || this.state.isMessageEnd) {
      nodemod.setMetaResult(0);
      return;
    }

    this.state.values.push(value);
    this.state.types.push(type);
    nodemod.setMetaResult(/* nodemod.mres.ignored */4);
  }
}

NodemodMessageWatcher.init();
