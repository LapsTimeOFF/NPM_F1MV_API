import { Config } from './Types';

export async function getF1MVVersion(config: Config) {
    const URL = `http://${config.host}:${config.port}/api/v1/app/version`;

    const response = await fetch(URL);
    const data = await response.json();

    let ver = data.version;
    ver = parseInt(ver.replace(/[\D]/g, ''));
    return ver;
}

export async function getAPIVersion(config: Config) {
    let data = await getF1MVVersion(config);

    if (data >= 180 && data < 1100) {
        return 'v2';
    } else if (data >= 1100) {
        return 'graphql';
    } else {
        return 'v1';
    }
}
