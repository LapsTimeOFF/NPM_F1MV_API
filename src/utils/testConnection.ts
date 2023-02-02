import fetch from 'node-fetch';
import { ConnectionDetails } from 'src/Types/Types';

export async function testConnection(config: ConnectionDetails) {
    try {
        const res = await (
            await fetch(
                `http://${config.host}:${config.port}/api/v1/app/version`
            )
        ).json();
        if (res.version !== undefined) {
            return res;
        }
        return false;
    } catch (error) {
        return false;
    }
}