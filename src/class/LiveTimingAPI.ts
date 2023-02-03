import { invalidConfig } from '../Errors/Errors';
import { ConnectionDetails } from '../Types/Types';
import { discoverF1MVInstances } from '../utils/autoDiscovery';

const debugFileHeader = `[${
    __filename.split('/')[__filename.split('/').length - 1]
}]`;

/**
 * This is the `LiveTimingAPI_Config` object type,<br/>
 * This type is the way to define all the needed infos like the `ConnectionDetails`, `apiVersion`, `proxy` URL, `debug` logs to the `LiveTimingAPI` class.
 *
 * * **Example:**
 * 
 * ! API Version `v1` is deprecated !
 *
 * Valid object:
 * ```ts
 * const LiveTimingAPI_Args: LiveTimingAPI_Config = {
 *      config: config, // See Type ConnectionDetails
 *      proxy: "http://127.0.0.1:5500/",
 *      debug: true,
 *      apiVersion: 'graphql'
 * }
 * ```
 */
export type LiveTimingAPI_Config = {
    config: ConnectionDetails;
    proxy?: URL | string;
    debug?: boolean;
    apiVersion: 'v1' | 'v2' | 'graphql';
};

export class LiveTimingAPI {
    config: ConnectionDetails | null;
    apiVersion: 'v1' | 'v2' | 'graphql' | null;
    debug: boolean = false;
    proxy: null | string | URL;

    constructor(args: LiveTimingAPI_Config) {
        // TODO : Validate Config
        if (!args.config || !args.apiVersion) throw invalidConfig;
        if (args.debug)
            console.log(
                debugFileHeader,
                'LiveTimingAPI constructor initialized'
            );
        if (args.config.autodiscovery && args.config.port) throw invalidConfig;

        this.config = args.config;
        this.apiVersion = args.apiVersion;
        this.debug = args.debug || false;
        this.proxy = args.proxy;

        if (this.config.autodiscovery) {
            if (this.debug)
                console.log(debugFileHeader, 'Starting AutoDiscovery...');
            this.loadPort();
        }
    }

    async loadPort() {
        const data = await discoverF1MVInstances(this.config.host, this.debug);
        if (this.debug) console.log(debugFileHeader, data);
        this.config.port = data.port;
    }
}
