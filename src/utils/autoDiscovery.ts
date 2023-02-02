import { noInstanceFounded } from "src/Errors/Errors";
import { ConnectionDetails } from "src/Types/Types";
import { testConnection } from "./testConnection";

export async function discoverF1MVInstances(host: string) {
    let basePort = 10101;
    let instanceFounded = false;

    for (let _i = basePort; _i < 10111; _i++) {
        let newConfig: ConnectionDetails = { host: host, port: _i };
        if ((await testConnection(newConfig)) !== false) {
            basePort = _i;
            instanceFounded = true;
            break;
        }
    }

    if (!instanceFounded) {
        throw noInstanceFounded;
    }

    return {
        instanceFounded: true,
        port: basePort,
    };
}