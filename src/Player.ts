import { Bounds, Config, AlwaysOnTopLevel } from './Types';
import fetch from 'node-fetch';

/**
 * Get the bounds of the player
 * @param config - the config object
 * @param id - id of the player
 * @returns data.players.bounds
 */
export async function getPlayerBounds(
  config: Config,
  id: number
): Promise<Bounds> {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `query Player($playerId: ID!) {
                player(id: $playerId) {
                  bounds {
                    height
                    width
                    x
                    y
                  }
                }
              }`,
        variables: { playerId: id },
        operationName: 'Player',
      }),
      method: 'POST',
    }
  );
  const data = (await response.json()).data.player.bounds;
  return data;
}

/**
 * Set the bounds of the player
 * @param config - the config object
 * @param id - id of the player
 * @param bounds - bounds of the player
 */
export async function setPlayerBounds(
  config: Config,
  id: number,
  bounds: Bounds
): Promise<object> {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerSetBounds($playerSetBoundsId: ID!, $bounds: RectangleInput!) {
                playerSetBounds(id: $playerSetBoundsId, bounds: $bounds) {
                  x
                  y
                }
              }`,
        variables: {
          playerSetBoundsId: id,
          bounds: {
            x: bounds.x,
            y: bounds.y,
          },
        },
        operationName: 'PlayerSetBounds',
      }),
      method: 'POST',
    }
  );

  return await response.json();
}

/**
 * Get all the players
 * @param config - the config object
 * @returns data.players
 */
export async function getAllPlayers(config: Config): Promise<object> {
  const result = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `query DriverData {
                    players {
                        id
                        type
                        state {
                          ts
                          paused
                          muted
                          volume
                          live
                          currentTime
                          interpolatedCurrentTime
                        }
                        driverData {
                          driverNumber
                          tla
                          firstName
                          lastName
                          teamName
                        }
                        streamData {
                          contentId
                          meetingKey
                          sessionKey
                          channelId
                          title
                        }
                        bounds {
                          x
                          y
                          width
                          height
                        }
                        fullscreen
                        alwaysOnTop
                        maintainAspectRatio
                      }
                  }`,
        variables: {},
        operationName: 'DriverData',
      }),
      method: 'POST',
    }
  );
  const data = (await result.json()).data.players;
  return data;
}

/**
 * Set if the speedometer is visible or not
 * @param config - the config object
 * @param id - the player id
 * @param visible - if it's visible or not
 * @returns - Promise<boolean>
 */
export async function setSpeedometerVisibility(
  config: Config,
  id: number,
  visible: boolean
): Promise<boolean> {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerSetSpeedometerVisibility($playerSetSpeedometerVisibilityId: ID!, $visible: Boolean) {
                playerSetSpeedometerVisibility(id: $playerSetSpeedometerVisibilityId, visible: $visible)
              }`,
        variables: {
          playerSetSpeedometerVisibilityId: id,
          visible,
        },
        operationName: 'PlayerSetSpeedometerVisibility',
      }),
      method: 'POST',
    }
  );

  const data = (await response.json()).data.playerSetSpeedometerVisibility;

  return data;
}

/**
 * Set the player to always on top and edit the level
 * @param config - the config object
 * @param id - the player id
 * @param alwaysOnTop - if the player should be always on top
 * @param level - {AlwaysOnTopLevel} the level of the always on top RECOMMENDED: 'FLOATING'
 * @returns - Promise<boolean>
 */
export async function setAlwaysOnTop(
  config: Config,
  id: number,
  alwaysOnTop: boolean,
  level: AlwaysOnTopLevel
): Promise<boolean> {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerSetAlwaysOnTop($playerSetAlwaysOnTopId: ID!, $alwaysOnTop: Boolean, $level: AlwaysOnTopLevel) {
                    playerSetAlwaysOnTop(id: $playerSetAlwaysOnTopId, alwaysOnTop: $alwaysOnTop, level: $level)
                  }`,
        variables: {
          playerSetAlwaysOnTopId: id,
          alwaysOnTop,
          level,
        },
        operationName: 'PlayerSetAlwaysOnTop',
      }),
      method: 'POST',
    }
  );

  const data = (await response.json()).data.playerSetAlwaysOnTop;

  return data;
}

/**
 * Create a player
 * @param config - the config object
 * @param numberDriver - the driver number
 * @param contentId - the contentOd
 * @param bounds - the bounds
 * @param streamTitle - the stream title
 * @returns - Promise<object>
 */
export async function createPlayer(
  config: Config,
  numberDriver: string | number,
  contentId: number | string,
  bounds: Bounds,
  maintainAspectRatio?: boolean,
  streamTitle?: string,
  alwaysOnTop?: boolean
): Promise<object> {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerCreate($input: PlayerCreateInput!) {
                playerCreate(input: $input)
              }`,
        variables: {
          input: {
            bounds: bounds,
            contentId: contentId,
            driverNumber:
              typeof numberDriver === 'string'
                ? parseInt(numberDriver)
                : numberDriver,
            maintainAspectRatio: maintainAspectRatio ?? true,
            streamTitle: streamTitle,
            alwaysOnTop: alwaysOnTop ?? false,
          },
        },
        operationName: 'PlayerCreate',
      }),
      method: 'POST',
    }
  );

  return await response.json();
}

/**
 * Sync all the players from 1 player
 * @param config - The config object
 * @param playerId - The main player
 */
export async function syncPlayers(
  config: Config,
  playerId: number | string
): Promise<object> {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerSync($playerSyncId: ID!) {
                playerSync(id: $playerSyncId)
              }`,
        variables: {
          playerSyncId: playerId,
        },
        operationName: 'PlayerSync',
      }),
      method: 'POST',
    }
  );

  return await response.json();
}

export async function removePlayer(config: Config, id: number | string) {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerDelete($playerDeleteId: ID!) {
                playerDelete(id: $playerDeleteId)
              }`,
        variables: {
          playerDeleteId: id,
        },
        operationName: 'PlayerDelete',
      }),
      method: 'POST',
    }
  );

  return await response.json();
}

export async function setVolumePlayer(config: Config, id: number | string, volume: number) {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerSetVolume($playerSetVolumeId: ID!, $volume: Float!) {
          playerSetVolume(id: $playerSetVolumeId, volume: $volume)
        }`,
        variables: {
          playerSetVolumeId: id,
          volume,
        },
        operationName: 'PlayerSetVolume',
      }),
      method: 'POST',
    }
  );

  return await response.json();
}

export async function setMutedPlayer(config: Config, id: number | string, muted: boolean) {
  const response = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlayerSetMuted($playerSetMutedId: ID!, $muted: Boolean) {
          playerSetMuted(id: $playerSetMutedId, muted: $muted)
        }`,
        variables: {
          playerSetMutedId: id,
          muted,
        },
        operationName: 'PlayerSetMuted',
      }),
      method: 'POST',
    }
  );

  return await response.json();
}
