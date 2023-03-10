import {
    Config,
    discoverF1MVInstances,
    getAPIVersion,
    getF1MVVersion,
    LiveTimingAPIV1,
    LiveTimingAPIV2,
    LiveTimingAPIGraphQL,
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
    console.log(await LiveTimingAPIV1(config, 'TrackStatus'));
    console.log(await LiveTimingAPIV2(config, ['TrackStatus', 'WeatherData']));
    console.log(
        await LiveTimingAPIGraphQL(config, ['TrackStatus', 'WeatherData'])
    );
})();
