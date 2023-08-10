import { Stream } from "stream";

export default interface IBananaInstallerOptions {
  /** @example valve_addon */
  targetFolder: string;
  unpack: (ext: string, stream: Stream, cb: (stream: Stream, entryName: string) => Promise<void>, fileName: string) => Promise<void>;
}