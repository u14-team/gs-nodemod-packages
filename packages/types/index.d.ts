import type EngineFunctions from "./eng";

declare global {
  namespace nodemod {
    const eng: EngineFunctions;
    const continueServer: () => void;
    const players: Entity[];
    const mapname: string;
  }
}