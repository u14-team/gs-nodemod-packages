# Messages from GoldSource
Read more messages on [https://wiki.alliedmods.net/Half-Life_1_Engine_Messages](https://wiki.alliedmods.net/Half-Life_1_Engine_Messages)
## SVC
### Bad = 0
### Nop = 1
### Disconnect = 2
Disconnects client from server with reason
```ts
new NodemodMessageBuilder(MsgType.Disconnect)
  .string('pressed the button in crossfire') // reason
  .send();
```

### Event = 3v
### Version = 4
Disconnects the client and sends a message to the console if the number passed doesn't match the current server protocol version.

```ts
new NodemodMessageBuilder(MsgType.Version)
  .long(1337) // server version
  .send();
```

### SetView = 5
DESCRIPTION

```ts
new NodemodMessageBuilder(MsgType.SetView)
  .entity(1) // target entity
  .send();
```

### Sound = 6
### Time = 7
### Print = 8
Sends a message to the client's console.

```ts
new NodemodMessageBuilder(MsgType.Print)
  .string('hello player') // message
  .send();
```

### StuffText = 9
Executes command on player.

### SetAngle = 10
Update immediately the client's view angles.

```ts
new NodemodMessageBuilder(MsgType.SetAngle)
  .angles(0, 360, 0)
  .send();
```

### ServerInfo = 11
### LightStyle = 12
### UpdateUserInfo = 13
### DeltaDescription = 14
### ClientData = 15
### StopSound = 16
### Pings = 17
### Particle = 18
Shows a particle effect.

```ts
new NodemodMessageBuilder(MsgType.Particle)
  .coords([ 0.619526743888855, -930.2538452148438, -1655.96875 ])
  .char(100) // dir x
  .char(100) // dir y
  .char(100) // dir z
  .byte(250) // count
  .byte(251) // color from quake pallete
  .send();
```

### Damage = 19
### SpawnStatic = 20
### EventReliable = 21
### SpawnBaseline = 22
### TempEntity = 23
Creates a temp entity.

```ts
new NodemodMessageBuilder(MsgType.TempEntity)
  .byte(TempEntity)
  // payload
  .send();
```

#### BeamPoints
Creates a beam between two points.

#### BeamEntPoint
Creates a beam between the primary entity and a point.

#### GunShot
Creates a particle effect plus a ricochet sound.



#### Explosion
Creates an additive sprite, 2 dynamic lights, flickering particles, explosion sound, and moves the sprite vertically.


#### TarExplosion
Creates the Quake 'tar' explosion.


#### Smoke
Creates a rising alphablend sprite at 30 pps.


#### Tracer
Creates a tracer effect from one point to another.

#### Lighting
Simplified options for TE_BEAMPOINTS - Lightning effect.

#### BeamEnts
Creates a beam between the primary entity and another entity.




### SetPause = 24
Puts client to a pause.

```ts
new NodemodMessageBuilder(MsgType.SetPause)
  .byte(0) // 1 - paused
  .send();
```

### SignOnNum = 25
DESCRIPTION

```ts
// TODO: codesample using NodemodMessageBuilder
```

### CenterPrint = 26
Sends a centered message.

```ts
new NodemodMessageBuilder(MsgType.CenterPrint)
  .string('sverh chelovek')
  .send();
```

### KilledMonster = 27
### FoundSecret = 28
### SpawnStaticSound = 29
### Intermission = 30
Shows the intermission camera view

```ts
new NodemodMessageBuilder(MsgType.Intermission)
  .send();
```

### Finale = 31
Shows the intermission camera view, and writes-out text passed in first parameter.

```ts
new NodemodMessageBuilder(MsgType.Finale)
  .string('sverh chelovek is: TheEVolk')
  .send();
```

### CdTrack = 32
### Restore = 33
### Cutscene = 34
Shows the intermission camera view, and writes-out text passed in first parameter.

```ts
new NodemodMessageBuilder(MsgType.Cutscene)
  .string('what is a intermission?')
  .send();
```

### WeaponAnim = 35
Plays a weapon sequence.

```ts
new NodemodMessageBuilder(MsgType.WeaponAnim)
  .byte(2)
  .byte(1)
  .send();
```

### DecalName = 36
### RoomType = 37
Sets client room_type cvar to provided value.

```ts
new NodemodMessageBuilder(MsgType.RoomType)
  .short(0)
  .send();
```

```
0 = Normal (off)
1 = Generic
2 = Metal Small
3 = Metal Medium
4 = Metal Large
5 = Tunnel Small
6 = Tunnel Medium
7 = Tunnel Large
8 = Chamber Small
9 = Chamber Medium
10 = Chamber Large
11 = Bright Small
12 = Bright Medium
13 = Bright Large
14 = Water 1
15 = Water 2
16 = Water 3
17 = Concrete Small
18 = Concrete Medium
19 = Concrete Large
20 = Big 1
21 = Big 2
22 = Big 3
23 = Cavern Small
24 = Cavern Medium
25 = Cavern Large
26 = Weirdo 1
27 = Weirdo 2
28 = Weirdo 3
```

### AddAngle = 38
### NewUserMsg = 39
Registers a new user message on the client.

### PacketEntities = 40
Contains information about the entity states, like origin, angles and such.
This message is the same as SVC_DELTAPACKETENTITIES, only with UpdateMask field omitted.

### DeltaPacketEntities = 41
Contains information about the entity states, like origin, angles and such.
This is the basic means of sending entity updates to the client.

### Choke = 42
Notify the client that some outgoing datagrams were not transmitted due to exceeding bandwidth rate limits.

### ResourceList = 43
This message contains all the resources provided by the server for clients to download. Consistency info can also be included.

### NewMoveVars = 44
Updates client's movevars.

### ResourceRequest = 45
Allows the client to send its own resource list (CLC_RESOURCELIST).

### Customization = 46
Notifies the client that a new customization is avaliable for download.

### CrosshairAngle = 47
Adjusts the weapon's crosshair angle.
Basically, the weapon position on the player's view can have a different origin.

### SoundFade = 48
Updates client side sound fade.
It's used to modulate sound volume on the client.
Such functionality is part of a main function where the purpose would be to update sound subsystem and cd audio.

### FileTxferFailed = 49
Sends a message to the client's console telling what file has failed to be transfered.

```ts
new NodemodMessageBuilder(MsgType.FileTxferFailed)
  .string('pony.mp4')
  .send();
```

### HLTV = 50
Tells client about current spectator mode. 

### Director = 51
### VoiceInit = 52
Sends sv_voicecodec and sv_voicequality cvars to client.

### VoiceData = 53
Contains compressed voice data.

### SendExtraInfo = 54
Sends some extra information regarding the server.

### TimeScale = 55
### ResourceLocation = 56
This message sends sv_downloadurl to client.

### SendCvarValue = 57
Request a cvar value from a connected client.

### SendCvarValue2 = 58
Request a cvar value from a connected client.

## Custom
### Common
#### `ScreenFade`
Paints the screen in a certain color for a certain time

```ts
new NodemodMessageBuilder('ScreenFade')
  .short(1 << 10) // duration
  .short(1 << 10) // holdTime
  .short(0x0000) // flags
  .rgba(100, 0, 100, 230) // color
  .send(player);
```

> Note: 1 second = 4096.

Fade flags (from shake.h):
```c
#define FFADE_IN       0x0000 // Just here so we don't pass 0 into the function
#define FFADE_OUT      0x0001 // Fade out (not in)
#define FFADE_MODULATE 0x0002 // Modulate (don't blend)
#define FFADE_STAYOUT  0x0004 // ignores the duration, stays faded out until new ScreenFade message received
#define FFADE_LONGFADE 0x0008
```