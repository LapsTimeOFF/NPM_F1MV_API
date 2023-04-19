import { Config } from './Types';
import fetch from 'node-fetch';

/**
 * Get the version of F1MV
 * @param config - the config object
 * @returns data.version
 * @example ```js
 * const version = await getF1MVVersion(config);
 * console.log(version);
 * // 1142
 * ```
 */
export async function getF1MVVersion(config: Config) {
  const { data } = await fetch(
    `http://${config.host}:${config.port}/api/graphql`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `query GetVersion {
          version
        }`,
        operationName: 'GetVersion',
      }),
      method: 'POST',
    }
  ).then((r) => r.json());

  let { version } = data;
  version = parseInt(version.replace(/[\D]/g, ''));
  return version;
}

/**
 * @deprecated
 * **This function is deprecated and will be removed in the next minor version due to the removal of the REST API of F1MV.**
 * Get the API version of F1MV
 * @param config - the config object
 * @param ignoreConfig - ignore the config object and use the versionToTest parameter
 * @param versionToTest - the version to test
 * @returns 'v1', 'v2' or 'graphql'
 * @example ```js
 * const version = await getAPIVersion(config);
 * console.log(version);
 * // v2
 * ```
 */
export async function getAPIVersion(
  config: Config,
  ignoreConfig?: boolean,
  versionToTest?: number
) {
  let data;

  if (!ignoreConfig) {
    data = await getF1MVVersion(config);
  } else {
    data = versionToTest;
  }

  if (data >= 180 && data < 1100) {
    return 'v2';
  } else if (data >= 1100) {
    return 'graphql';
  } else {
    return 'v1';
  }
}
