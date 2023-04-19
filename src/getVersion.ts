import { Config } from './Types';
import fetch from 'node-fetch';

export async function getF1MVVersion(config: Config) {
  const URL = `http://${config.host}:${config.port}/api/v1/app/version`;

  const response = await fetch(URL);
  const data = await response.json();

  let { version } = data;
  version = parseInt(version.replace(/[\D]/g, ''));
  return version;
}

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
