import { testConnection } from './connection';
import { noInstanceFounded } from './Errors';
import { Config } from './Types';

export async function discoverF1MVInstances(host: string) {
    let basePort = 10101;
    let instanceFounded = false;

    for (let _i = basePort; _i < 10111; _i++) {
        let newConfig: Config = { host: host, port: _i };
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
