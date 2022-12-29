import { Config } from "./Types";

export async function testConnection(config: Config) {
    try {
        const res = await (await fetch(`http://${config.host}:${config.port}/api/v1/app/version`)).json();
        return res;
    } catch (error) {
        return false;
    }
}