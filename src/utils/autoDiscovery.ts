import { noInstanceFounded } from '../Errors/Errors';
import { ConnectionDetails } from '../Types/Types';
import { testConnection } from './testConnection';

const debugFileHeader = `[${
  __filename.split('/')[__filename.split('/').length - 1]
}]`;

/**
 * [API ONLY] Detect a F1MV instance on a computer.
 * @param host - String, define the host to discover the F1MV instance
 * @returns data about a found instance or an error.
 */
export async function discoverF1MVInstances(host: string, debug?: boolean) {
  let basePort = 10101;
  let instanceFounded = false;

  for (let _i = basePort; _i < 10111; _i++) {
    const newConfig: ConnectionDetails = { host: host, port: _i };
    if (debug) console.log(debugFileHeader, newConfig);
    if ((await testConnection(newConfig)) !== false) {
      if (debug)
        console.log(
          debugFileHeader,
          `Instance found on port ${newConfig.port}`,
        );
      basePort = _i;
      instanceFounded = true;
      break;
    }
    if (debug)
      console.log(
        debugFileHeader,
        `No instance found on port ${newConfig.port}`,
      );
  }

  if (!instanceFounded) {
    throw noInstanceFounded;
  }

  return {
    instanceFounded: true,
    port: basePort,
  };
}
