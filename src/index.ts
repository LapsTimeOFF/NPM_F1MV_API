import { LiveTimingAPI_Config, LiveTimingAPI } from "./class/LiveTimingAPI";
import { invalidConfig, noInstanceFounded } from "./Errors/Errors";
import { ConnectionDetails } from "./Types/Types";
import { discoverF1MVInstances } from "./utils/autoDiscovery";

export {
    ConnectionDetails,

    LiveTimingAPI_Config,
    LiveTimingAPI,

    discoverF1MVInstances,

    invalidConfig,
    noInstanceFounded
};
