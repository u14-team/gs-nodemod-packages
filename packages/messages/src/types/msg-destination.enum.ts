enum MsgDestination {
  /** Unreliable to all */
  Broadcast = 0,

  /** Reliable to one (msg_entity) */
  One = 1,

  /** Reliable to all */
  All = 2,

  /** Write to the init string */
  Init = 3,

  /** Ents in PVS of org */
  Pvs = 4,

  /** Ents in PAS of org */
  Pas = 5,

  /** Reliable to PVS */
  PvsR = 6,

  /** Reliable to PAS */
  PasR = 7,

  /** Send to one client, but don't put in reliable stream, put in unreliable datagram (could be dropped) */
  OneUnreliable = 8,

  /** Sends to all spectator proxies */
  Spec = 9
}

export default MsgDestination;
