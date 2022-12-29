import {
    Config,
    discoverF1MVInstances,
    getAPIVersion,
    getF1MVVersion,
} from '../src';

(async () => {
    const { port } = await discoverF1MVInstances('localhost');

    const config: Config = {
        host: 'localhost',
        port: port,
    };

    console.log(await discoverF1MVInstances(config.host));
    console.log(await getF1MVVersion(config));
    console.log(await getAPIVersion(config));
})();
