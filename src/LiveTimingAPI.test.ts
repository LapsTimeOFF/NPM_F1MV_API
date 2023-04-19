import { invalidTopic } from './Errors';
import { LiveTimingAPIV1, LiveTimingAPIV2 } from './LiveTimingAPI';
import { Topic } from './Types';
import express from 'express';
const app = require('express')();

describe('LiveTimingAPIV1', () => {
  let server: express = null;
  beforeEach(async () => {
    server = await app.listen(8080);
    await app.get('/api/v1/live-timing/:topic', (req, res) => {
      if (req.params.topic !== 'RaceControlMessages') {
        res.send({ success: false });
      }
      res.send({ Messages: [] });
    });
  });

  afterEach(() => {
    server.close();
  });

  it('returns the data if the topic is valid', async () => {
    const config = { host: 'localhost', port: 8080 };
    const topic: Topic = 'RaceControlMessages';
    const response = await LiveTimingAPIV1(config, topic);
    expect(response).toEqual({
      Messages: [],
    });
  });

  it('returns an error message if the topic is invalid', async () => {
    const config = { host: 'localhost', port: 8080 };
    const topic = 'invalid';
    // @ts-ignore
    const response = await LiveTimingAPIV1(config, topic);
    expect(response).toEqual(invalidTopic);
  });
});

describe('LiveTimingAPIV2', () => {
  let server: express = null;
  beforeEach(async () => {
    server = await app.listen(8080);
    await app.get('/api/v2/live-timing/state/:topic', (req, res) => {
      if (req.params.topic !== 'RaceControlMessages,TrackStatus') {
        res.send({ success: false });
      }
      res.send({
        RaceControlMessages: { Messages: [] },
        TrackStatus: {
          Status: 1,
          Message: 'AllClear',
        },
      });
    });
  });

  afterEach(() => {
    server?.close();
  });

  it('returns the data if the topic is valid', async () => {
    const config = { host: 'localhost', port: 8080 };
    const topic: Array<Topic> = ['RaceControlMessages', 'TrackStatus'];
    const response = await LiveTimingAPIV2(config, topic);
    expect(response).toEqual({
      RaceControlMessages: { Messages: [] },
      TrackStatus: {
        Status: 1,
        Message: 'AllClear',
      },
    });
  });

  it('returns an error message if the topic is invalid', async () => {
    const config = { host: 'localhost', port: 8080 };
    const topic = 'invalid';
    // @ts-ignore
    const response = await LiveTimingAPIV2(config, topic);
    expect(response).toEqual(invalidTopic);
  });
});
