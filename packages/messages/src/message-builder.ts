import MsgDestination from './types/msg-destination.enum.js';

export default class NodemodMessageBuilder {
  private readonly items: (() => void)[] = [];
  private _destination?: MsgDestination;
  private readonly type: number;
  private _origin: [number, number, number];

  public constructor(type: string | number) {
    if (typeof type === 'string') {
      type = (nodemod.getUserMsgId(type) ?? nodemod.eng.regUserMsg(type, -1)) as number;
    }

    this.type = type;
  }

  public send(entity?: object | number) {
    if (this._destination === undefined) {
      this._destination = entity ? MsgDestination.One : MsgDestination.All;
    }

    if (typeof entity === 'number') {
      entity = nodemod.eng.pEntityOfEntIndex(entity);
    }

    nodemod.eng.messageBegin(
      this._destination,
      this.type,
      this._origin || [0, 0, 0],
      entity
    );

    this.items.map(v => v());
    nodemod.eng.messageEnd();
  }

  public destination(destination: MsgDestination) {
    this._destination = destination;
    return this;
  }

  public origin(origin: [number, number, number]) {
    this._origin = origin;
    return this;
  }

  // base
  public byte(value: number) {
    this.items.push(() => nodemod.eng.writeByte(value));
    return this;
  }

  public char(value: number) {
    this.items.push(() => nodemod.eng.writeChar(value));
    return this;
  }

  public short(value: number) {
    this.items.push(() => nodemod.eng.writeShort(value));
    return this;
  }

  public long(value: number) {
    this.items.push(() => nodemod.eng.writeLong(value));
    return this;
  }

  public angle(value: number) {
    this.items.push(() => nodemod.eng.writeAngle(value));
    return this;
  }

  public coord(value: number) {
    this.items.push(() => nodemod.eng.writeCoord(value));
    return this;
  }

  public string(value: string) {
    this.items.push(() => nodemod.eng.writeString(value));
    return this;
  }

  public entity(value: object) {
    this.items.push(() => nodemod.eng.writeEntity(typeof value === 'number' ? value : value.id));
    return this;
  }

  // builds
  public rgb(r: number, g: number, b: number) {
    this.items.push(() => {
      nodemod.eng.writeByte(r);
      nodemod.eng.writeByte(g);
      nodemod.eng.writeByte(b);
    });

    return this;
  }

  public rgba(r: number, g: number, b: number, a: number) {
    this.items.push(() => {
      nodemod.eng.writeByte(r);
      nodemod.eng.writeByte(g);
      nodemod.eng.writeByte(b);
      nodemod.eng.writeByte(a);
    });

    return this;
  }

  /** pith, yaw, roll */
  public angles(pitch: number, yaw: number, roll: number) {
    this.items.push(() => {
      const scale = 65536 / 360;
      nodemod.eng.writeShort(pitch * scale);
      nodemod.eng.writeShort(yaw * scale);
      nodemod.eng.writeShort(roll * scale);
    });

    return this;
  }

  public coords(origin: [number, number, number]) {
    this.items.push(() => {
      nodemod.eng.writeCoord(origin[0]);
      nodemod.eng.writeCoord(origin[1]);
      nodemod.eng.writeCoord(origin[2]);
    });

    return this;
  }
}