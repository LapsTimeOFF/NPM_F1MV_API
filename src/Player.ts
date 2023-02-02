import { Bounds, Config } from './Types';
import fetch from 'node-fetch';

/**
 *
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
 *
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
                      driverData {
                        driverNumber
                      }
                      id
                      streamData {
                        contentId
                        title
                      }
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
 *
 * @param config - the config object
 * @param id - the player id
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
 *
 * @param config - the config object
 * @param numberDriver - the driver number
 * @param contentId - the contentOd
 * @param bounds - the bounds
 * @returns - Promise<object>
 */
export async function createPlayer(
    config: Config,
    numberDriver: number | string,
    contentId: number | string,
    bounds: Bounds
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
                        driverNumber: numberDriver,
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
