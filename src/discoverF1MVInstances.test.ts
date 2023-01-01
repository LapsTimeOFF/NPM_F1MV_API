import { discoverF1MVInstances } from './discoverF1MVInstances';
import { noInstanceFounded } from './Errors';

jest.setTimeout(60000);

test('Return correct error on invalid IP', async () => {
    try {
        await discoverF1MVInstances('192.168.1.254');
    } catch (error) {
        expect(error).toBe(noInstanceFounded);
    }
});
