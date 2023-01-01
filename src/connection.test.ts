import { testConnection } from './connection';
import { Config } from './Types';

jest.setTimeout(60000);

test('Return false on invalid IP', async () => {
    const config: Config = {
        host: '192.168.1.254',
        port: 10101,
    };

    expect(await testConnection(config)).toBe(false);
});
