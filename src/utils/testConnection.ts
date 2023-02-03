import fetch from 'node-fetch';
import { ConnectionDetails } from '../Types/Types';

/**
 * [API ONLY] Check if a given config is refering to a valid MUVI instance.
 * @param config - The config object
 * @param booleanReturn - Should it return a boolean or the version data ?
 * @returns Promise<object | boolean>
 */
export async function testConnection(config: ConnectionDetails, booleanReturn?: boolean): Promise<object | boolean> {
    try {
        const res = await (
            await fetch(
                `http://${config.host}:${config.port}/api/v1/app/version`
            )
        ).json();
        if (res.version !== undefined) {
            return booleanReturn ? true : res;
        }
        return false;
    } catch (error) {
        return false;
    }
}