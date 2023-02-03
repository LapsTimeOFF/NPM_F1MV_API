import { LiveTimingAPI_Config, LiveTimingAPI } from "./class/LiveTimingAPI";
import { invalidConfig, noInstanceFounded } from "./Errors/Errors";
import { ConnectionDetails } from "./Types/Types";
import { discoverF1MVInstances } from "./utils/autoDiscovery";
import { testConnection } from "./utils/testConnection";

export {
    ConnectionDetails,

    LiveTimingAPI_Config,
    LiveTimingAPI,

    discoverF1MVInstances,
    testConnection,

    invalidConfig,
    noInstanceFounded
};
