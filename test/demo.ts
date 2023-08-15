import {
  ConnectionDetails, LiveTimingAPI,
} from '../src';

(async () => {
  const config: ConnectionDetails = {
    host: 'localhost',
    port: 10101,
  };

  const LiveTiming = new LiveTimingAPI({config, debug: true, apiVersion: 'graphql'});

  setTimeout(() => {
    console.log(LiveTiming.config?.port);
  }, 1000);
})();
