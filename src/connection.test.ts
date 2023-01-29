import { testConnection } from './connection';
import { Config } from './Types';
const app = require('express')();

describe('testConnection', () => {
    it('returns the version if the connection is successful', async () => {
        const server = await app.listen(3031);
        await app.get('/api/v1/app/version', (_, res) => {
            res.send({ version: 'TEST' });
        });
        const config: Config = { host: 'localhost', port: 3031 };
        const response = await testConnection(config);
        server.close();
        expect(response).toEqual({ version: 'TEST' });
    });

    it('returns false if the connection is unsuccessful', async () => {
        const config: Config = { host: 'invalid', port: 8080 };
        const response = await testConnection(config);
        expect(response).toBe(false);
    });
});
