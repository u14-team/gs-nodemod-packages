import MsgDestination from "./msg-destination.enum";
import MsgPartType from "./msg-part-type.enum";
import MsgType from "./msg-type.enum";

export default interface IMessageState<T = (string | number)[]> {
  dest: MsgDestination;
  type: MsgType;
  name: string;
  origin: [number, number, number];
  entity: object;
  types: MsgPartType[];
  values: T;
  isMessageEnd: boolean;
}