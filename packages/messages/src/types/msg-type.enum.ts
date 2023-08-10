enum MsgType {
  Bad = 0,
  Nop = 1,
  Disconnect = 2,
  Event = 3,
  Version = 4,
  SetView = 5,
  Sound = 6,
  Time = 7,
  Print = 8,
  StuffText = 9,
  SetAngle = 10,
  ServerInfo = 11,
  LightStyle = 12,
  UpdateUserInfo = 13,
  DeltaDescription = 14,
  ClientData = 15,
  StopSound = 16,
  Pings = 17,
  Particle = 18,
  Damage = 19,
  SpawnStatic = 20,
  EventReliable = 21,
  SpawnBaseline = 22,
  TempEntity = 23,
  SetPause = 24,
  SignOnNum = 25,
  CenterPrint = 26,
  KilledMonster = 27,
  FoundSecret = 28,
  SpawnStaticSound = 29,
  Intermission = 30,
  Finale = 31,
  CdTrack = 32,
  Restore = 33,
  Cutscene = 34,
  WeaponAnim = 35,
  DecalName = 36,
  RoomType = 37,
  AddAngle = 38,
  NewUserMsg = 39,
  PacketEntities = 40,
  DeltaPacketEntities = 41,
  Choke = 42,
  ResourceList = 43,
  NewMoveVars = 44,
  ResourceRequest = 45,
  Customization = 46,
  CrosshairAngle = 47,
  SoundFade = 48,
  FileTxferFailed = 49,
  HLTV = 50,
  Director = 51,
  VoiceInit = 52,
  VoiceData = 53,
  SendExtraInfo = 54,
  TimeScale = 55,
  ResourceLocation = 56,
  SendCvarValue = 57,
  SendCvarValue2 = 58
};

export default MsgType;
