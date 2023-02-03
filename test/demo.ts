import {
    ConnectionDetails, LiveTimingAPI,
} from '../src';

(async () => {
    const config: ConnectionDetails = {
        host: 'localhost',
        autodiscovery: true,
    };

    const LiveTiming = new LiveTimingAPI({config, debug: true})
})();
