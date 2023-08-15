import { testConnection } from '../utils/testConnection';
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
 * ! API Version `v1` and `v2` are deprecated! You should use `graphql` instead.
 *
 * Valid object:
 * ```ts
 * const LiveTimingAPI_Args: LiveTimingAPI_Config = {
 *    config: config, // See Type ConnectionDetails
 *    proxy: "http://127.0.0.1:5500/",
 *    debug: true,
 *    apiVersion: 'graphql'
 * }
 * ```
 */
export type LiveTimingAPI_Config = {
  config: ConnectionDetails;
  proxy?: URL | string;
  debug?: boolean;
  apiVersion: 'v1' | 'v2' | 'graphql';
};

/**
 * This class is the `LiveTimingAPI` controller, it will be used to access to the full Live Timing API.
 */
export class LiveTimingAPI {
  config: ConnectionDetails;
  apiVersion: 'v1' | 'v2' | 'graphql' | undefined;
  debug: boolean = false;
  proxy: undefined | string | URL;

  /**
   * In the constructor, it will determine if the config is valid,<br/> It will also trigger the correct function if a `autoDiscovery` is requested or if we need to check if `port` is valid.
   * @param args - LiveTimingAPI_Config
   */
  constructor(args: LiveTimingAPI_Config) {
    // TODO : Validate Config
    if (!args.config || !args.apiVersion) throw invalidConfig;
    if (args.debug)
      console.log(debugFileHeader, 'LiveTimingAPI constructor initialized');
    if (args.config.autodiscovery && args.config.port) throw invalidConfig;

    this.config = args.config;
    this.apiVersion = args.apiVersion;
    this.debug = args.debug || false;
    this.proxy = args.proxy;

    if (this.config.autodiscovery) {
      if (this.debug) console.log(debugFileHeader, 'Starting AutoDiscovery...');
      this.loadPort();
    } else {
      this.checkPort();
    }
  }

  /**
   * This function is triggered when `autoDiscovery` is `true` in the config.
   */
  async loadPort() {
    const data = await discoverF1MVInstances(this.config.host, this.debug);
    if (this.debug) console.log(debugFileHeader, data);
    this.config.port = data.port;
  }

  /**
   * This function is triggered if a `port` is defined in the config.
   */
  async checkPort() {
    if (this.debug)
      console.log(debugFileHeader, 'Testing if the given port is valid...');
    const valid = await testConnection(this.config, true);
    if (this.debug)
      console.log(debugFileHeader, 'testConnection returned', valid);
    if (!valid) {
      if (this.debug)
        console.log(
          debugFileHeader,
          'Given config is invalid, throw invalidConfig.',
        );

      throw invalidConfig;
    }
    if (this.debug) console.log(debugFileHeader, 'Config valid.');
  }
}
