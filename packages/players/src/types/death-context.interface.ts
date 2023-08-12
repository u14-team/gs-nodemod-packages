export default interface IDeathContext<T = any> {
  killer: Entity;
  victim: Entity;
  killerState: T | null;
  victimState: T;
  isSuicide: boolean;
  isSafeKill: boolean;
  weapon: string;
}
