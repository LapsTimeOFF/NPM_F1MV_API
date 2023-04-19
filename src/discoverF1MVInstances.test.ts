import { testConnection } from './connection';
import { discoverF1MVInstances } from './discoverF1MVInstances';
import { noInstanceFounded } from './Errors';

jest.mock('./connection', () => ({
  testConnection: jest.fn(),
}));

describe('discoverF1MVInstances', () => {
  it('returns the port of a found instance', async () => {
    (testConnection as jest.Mock).mockResolvedValue(false);
    (testConnection as jest.Mock).mockResolvedValueOnce({
      version: '1.0.0',
    });

    const host = 'localhost';
    const response = await discoverF1MVInstances(host);
    expect(response).toEqual({ instanceFounded: true, port: 10101 });
  });

  it('throws an error if no instance is found', async () => {
    (testConnection as jest.Mock).mockResolvedValue(false);

    const host = 'localhost';
    await expect(discoverF1MVInstances(host)).rejects.toThrow(
      noInstanceFounded
    );
  });
});
