import { getFIA_Documents } from './publicAPI';

test('getFIA_Documents function should return data for the specified year', async () => {
    const year = 2020;
    const data = await getFIA_Documents(year);

    expect(data).toBeDefined();
});
