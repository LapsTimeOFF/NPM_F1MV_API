import { invalidTopic } from './Errors';
import { LiveTimingAPIV1, LiveTimingAPIV2, F1LiveTimingAPIGraphQL } from './LiveTimingAPI';
import { Topic } from './Types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
import { Server } from 'http';

describe('LiveTimingAPIV1', () => {
  let server: Server | null = null;

  beforeAll((done) => {
    const app = express();
    app.get('/api/v1/live-timing/:topic', (req, res) => {
      if (req.params.topic !== 'RaceControlMessages') {
        return res.send({ success: false });
      }
      res.send({ Messages: [] });
    });
    server = app.listen(8081, done);
  });

  afterAll((done) => {
    server!.close(done);
  });

  it('returns the data if the topic is valid', async () => {
    const config = { host: 'localhost', port: 8081 };
    const topic: Topic = 'RaceControlMessages';
    const response = await LiveTimingAPIV1(config, topic);
    expect(response).toEqual({
      Messages: [],
    });
  });

  it('returns an error message if the topic is invalid', async () => {
    const config = { host: 'localhost', port: 8081 };
    const topic = 'invalid';
    // @ts-ignore
    const response = await LiveTimingAPIV1(config, topic);
    expect(response).toEqual(invalidTopic);
  });
});

describe('LiveTimingAPIV2', () => {
  let server: Server | null = null;

  beforeAll((done) => {
    const app = express();
    app.get('/api/v2/live-timing/state/:topic', (req, res) => {
      if (req.params.topic !== 'RaceControlMessages,TrackStatus') {
        return res.send({ success: false });
      }
      res.send({
        RaceControlMessages: { Messages: [] },
        TrackStatus: {
          Status: 1,
          Message: 'AllClear',
        },
      });
    });
    server = app.listen(8082, done);
  });

  afterAll((done) => {
    server!.close(done);
  });

  it('returns the data if the topic is valid', async () => {
    const config = { host: 'localhost', port: 8082 };
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
    const config = { host: 'localhost', port: 8082 };
    const topic = 'invalid';
    // @ts-ignore
    const response = await LiveTimingAPIV2(config, topic);
    expect(response).toEqual(invalidTopic);
  });
});

describe('F1LiveTimingAPIGraphQL', () => {
  let server: Server | null = null;

  beforeAll((done) => {
    const app = express();
    app.use(express.json());
    app.post('/api/graphql', (req, res) => {
      const { query } = req.body;
      if (query && query.includes('f1LiveTimingState')) {
        return res.json({
          data: {
            f1LiveTimingState: {
              TrackStatus: {
                Status: '1',
                Message: 'AllClear',
              },
            },
          },
        });
      }
      res.json({ data: { success: false } });
    });
    server = app.listen(8083, done);
  });

  afterAll((done) => {
    server!.close(done);
  });

  it('returns the data for a single topic', async () => {
    const config = { host: 'localhost', port: 8083 };
    const topic: Topic = 'TrackStatus';
    const response = await F1LiveTimingAPIGraphQL(config, topic);
    expect(response).toEqual({
      TrackStatus: {
        Status: '1',
        Message: 'AllClear',
      },
    });
  });

  it('returns the data for multiple topics', async () => {
    const config = { host: 'localhost', port: 8083 };
    const topics: Array<Topic> = ['TrackStatus'];
    const response = await F1LiveTimingAPIGraphQL(config, topics);
    expect(response).toEqual({
      TrackStatus: {
        Status: '1',
        Message: 'AllClear',
      },
    });
  });
});
