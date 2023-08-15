import { Config } from './Types';
import fetch from 'node-fetch';

export async function testConnection(config: Config) {
  try {
    const {data} = await (
      await fetch(
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
      )
    ).json();

    if (data.version !== undefined) {
      return data;
    }
    return false;
  } catch (error) {
    return false;
  }
}
