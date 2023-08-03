import { getF1MVVersion, getAPIVersion } from './getVersion';
import express from 'express';
const app = require('express')();

describe('getF1MVVersion', () => {
  it('returns the version as an integer', async () => {
    let server = await app.listen(8081);
    await app.post('/api/graphql', (_, res) => {
      res.send({
        data: {
          version: '1.14.2',
        },
      });
    });
    const config = { host: 'localhost', port: 8081 };
    const response = await getF1MVVersion(config);
    server.close();
    expect(response).toBe(1142);
  });
});

describe('getAPIVersion', () => {
  it('returns "v2" if the version is >= 180 and < 1100', async () => {
    const config = { host: 'localhost', port: 8082 };
    const response = await getAPIVersion(config, true, 181);
    expect(response).toBe('v2');
  });

  it('returns "graphql" if the version is >= 1100', async () => {
    const config = { host: 'localhost', port: 8083 };
    const response = await getAPIVersion(config, true, 1200);
    expect(response).toBe('graphql');
  });

  it('returns "v1" if the version is < 180', async () => {
    const config = { host: 'localhost', port: 8084 };
    const response = await getAPIVersion(config, true, 100);
    expect(response).toBe('v1');
  });
});
