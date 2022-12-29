import { Config } from './Types';
import { getF1MVVersion, getAPIVersion } from './getVersion';

export class Instance {
    private config: Config;
    private host: string;
    private port: number | string;

    constructor(config: Config) {
        this.host = config.host;
        this.port = config.port;
        this.config = config;
    }

    async getF1MVVersion() {
        return await getF1MVVersion(this.config);
    }
    async getAPIVersion() {
        return await getAPIVersion(this.config);
    }
}

export default Instance;
