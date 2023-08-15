/**
 * This is the `ConnectionDetails` object type,
 * this type is the way to define correctly the host/port of MultiViewer.
 *
 * ! You can't have `port` and `autodiscovery` defined at the same time, it will throw an error. !
 *
 * * **Example:**
 *
 * Valid config with defined port:
 * ```ts
 * const config: ConnectionDetails = {
 *      host: 'localhost',
 *      port: 10101
 * }
 * ```
 * Valid config with AutoDiscovery:
 * ```ts
 * const config: ConnectionDetails = {
 *      host: 'localhost',
 *      autodiscovery: true,
 * }
 * ```
 * * **Invalid config:**
 * ```ts
 * const config: ConnectionDetails = {
 *      host: 'localhost',
 *      autodiscovery: true,
 *      port: 10101
 * }
 * ```
 */
export type ConnectionDetails = {
  host: string;
  port?: number;
  autodiscovery?: boolean;
};
