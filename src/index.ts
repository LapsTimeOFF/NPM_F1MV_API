import { Bounds, ClockTopic, Config, Topic, Year } from './Types';
import { getF1MVVersion, getAPIVersion } from './getVersion';
import { discoverF1MVInstances } from './discoverF1MVInstances';
import {
    LiveTimingAPIGraphQL,
    LiveTimingAPIV1,
    LiveTimingAPIV2,
    LiveTimingClockAPIGraphQL,
} from './LiveTimingAPI';
import { testConnection } from './connection';
import { noInstanceFounded, invalidTopic } from './Errors';
import { getFIA_Documents, getCircuitInfo } from './publicAPI';
import {
    createPlayer,
    getAllPlayers,
    getPlayerBounds,
    removePlayer,
    setPlayerBounds,
    setSpeedometerVisibility,
    syncPlayers,
} from './Player';
import { customGraphQL } from './GraphQL';

export {
    Config,
    Topic,
    ClockTopic,
    Year,
    Bounds,
    getAPIVersion,
    getF1MVVersion,
    getFIA_Documents,
    getCircuitInfo,
    getPlayerBounds,
    createPlayer,
    createPlayer as createWindow,
    removePlayer,
    syncPlayers,
    setPlayerBounds,
    setSpeedometerVisibility,
    getAllPlayers,
    customGraphQL,
    discoverF1MVInstances,
    LiveTimingAPIV1,
    LiveTimingAPIV2,
    LiveTimingAPIGraphQL,
    LiveTimingClockAPIGraphQL,
    testConnection,
    noInstanceFounded,
    invalidTopic,
};
