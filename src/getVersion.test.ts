import { getF1MVVersion, getAPIVersion } from './getVersion';
import express from 'express';
const app = require('express')();

describe('getF1MVVersion', () => {
  it('returns the version as an integer', async () => {
    let server = await app.listen(8081);
    await app.get('/api/v1/app/version', (_, res) => {
      res.send({ version: '1.10.0' });
    });
    const config = { host: 'localhost', port: 8081 };
    const response = await getF1MVVersion(config);
    server.close();
    expect(response).toBe(1100);
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
