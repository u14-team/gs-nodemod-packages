export default interface IDeathContext<T = any> {
  killer: object;
  victim: object;
  killerState: T | null;
  victimState: T;
  isSuicide: boolean;
  isSafeKill: boolean;
  weapon: string;
}
