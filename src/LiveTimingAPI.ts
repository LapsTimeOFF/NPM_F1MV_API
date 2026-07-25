import { invalidTopic } from './Errors';
import { ClockTopic, Config, Topic } from './Types';
import fetch from 'node-fetch';

/**
 * Call the Live Timing on V1
 * @deprecated This function is deprecated and will be removed in the next minor version due to the removal of the REST API of F1MV.
 * @param config - the config object
 * @param topic - a Topic
 * @returns an object
 */
export async function LiveTimingAPIV1(config: Config, topic: Topic) {
  const data: any = await (
    await fetch(
      `http://${config.host}:${config.port}/api/v1/live-timing/${topic}`
    )
  ).json();

  if (data.success === false) {
    return invalidTopic;
  } else {
    return data;
  }
}

/**
 * Call the Live Timing on V2
 * @deprecated This function is deprecated and will be removed in the next minor version due to the removal of the REST API of F1MV.
 * @param config - the config object
 * @param topic - a Topic or an Array<Topic>
 * @returns an object
 */
export async function LiveTimingAPIV2(
  config: Config,
  topic: Topic | Array<Topic>
) {
  const data: any = await (
    await fetch(
      `http://${config.host}:${config.port}/api/v2/live-timing/state/${
        typeof topic === 'object' ? topic.join(',') : topic
      }`
    )
  ).json();

  if (data.success === false) {
    return invalidTopic;
  } else {
    return data;
  }
}

/**
 * Call the F1 Live Timing State via GraphQL
 *
 * @param config - the config object
 * @param topic - a Topic or an Array<Topic>
 * @returns an object
 */
export async function F1LiveTimingAPIGraphQL(
  config: Config,
  topic: Topic | Array<Topic>
) {
  const { data }: any = await (
    await fetch(`http://${config.host}:${config.port}/api/graphql`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `query F1LiveTimingState {
                            f1LiveTimingState {
                                ${
                                  typeof topic === 'object'
                                    ? topic.join('\n')
                                    : topic
                                }
                            }
                        }`,
        operationName: 'F1LiveTimingState',
      }),
      method: 'POST',
    })
  ).json();

  if (data.success === false) {
    return invalidTopic;
  } else {
    return data.f1LiveTimingState;
  }
}

/**
 * Call the F1 Live Timing Clock via GraphQL
 *
 * @param config - the config object
 * @param topic - a ClockTopic or an Array<ClockTopic>
 * @returns an object
 */
export async function F1LiveTimingClockAPIGraphQL(
  config: Config,
  topic: ClockTopic | Array<ClockTopic>
) {
  const { data }: any = await (
    await fetch(`http://${config.host}:${config.port}/api/graphql`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `query F1LiveTimingClock {
                            f1LiveTimingClock {
                                ${
                                  typeof topic === 'object'
                                    ? topic.join('\n')
                                    : topic
                                }
                            }
                        }`,
        operationName: 'F1LiveTimingClock',
      }),
      method: 'POST',
    })
  ).json();

  if (data.success === false) {
    return invalidTopic;
  } else {
    return data.f1LiveTimingClock;
  }
}

/**
 * Call the Live Timing on GraphQL
 *
 * @deprecated Use {@link F1LiveTimingAPIGraphQL} instead. The `liveTimingState` query field is deprecated in the MultiViewer GraphQL schema.
 * @param config - the config object
 * @param topic - a Topic or an Array<Topic>
 * @returns an object
 */
export async function LiveTimingAPIGraphQL(
  config: Config,
  topic: Topic | Array<Topic>
) {
  return F1LiveTimingAPIGraphQL(config, topic);
}

/**
 * Call the Live Timing Clock on GraphQL
 *
 * @deprecated Use {@link F1LiveTimingClockAPIGraphQL} instead. The `liveTimingClock` query field is deprecated in the MultiViewer GraphQL schema.
 * @param config - the config object
 * @param topic - a ClockTopic or an Array<ClockTopic>
 * @returns an object
 */
export async function LiveTimingClockAPIGraphQL(
  config: Config,
  topic: ClockTopic | Array<ClockTopic>
) {
  return F1LiveTimingClockAPIGraphQL(config, topic);
}

// curl --request POST \
//     --header 'content-type: application/json' \
//     --url  \
//     --data '{"query":"query ExampleQuery {\n  f1LiveTimingState {\n    TrackStatus\n  }\n}"}'
