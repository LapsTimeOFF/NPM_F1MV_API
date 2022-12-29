import Instance from '../src';
import { Config } from '../src/Types';

const config: Config = {
    host: 'localhost',
    port: 10101,
};

const F1MV = new Instance(config);
(async () => {
    console.log(await F1MV.getF1MVVersion());
    console.log(await F1MV.getAPIVersion());
})();
