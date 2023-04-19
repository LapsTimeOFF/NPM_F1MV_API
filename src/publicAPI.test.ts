import { getFIA_Documents, getCircuitInfo } from './publicAPI';

describe('FIA documents', () => {
  test('getFIA_Documents function should return data for the specified year', async () => {
    const year = 2022;
    const data = await getFIA_Documents(year);

    expect(data).toBeDefined();
  });
});

describe('Circuits info', () => {
  test('getCircuitsInfo function should return data for the specified circuit and year', async () => {
    const circuitId = 151;
    const year = 2022;
    const data = await getCircuitInfo(circuitId, year);

    expect(data).toBeDefined();
  });
});
