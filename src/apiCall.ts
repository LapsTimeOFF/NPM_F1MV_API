import { invalidTopic } from './Errors';
import { ClockTopic, Config, Topic } from './Types';

/**
 * Call the Live Timing on V1 [DEPRECATED]
 *
 * @deprecated
 * @param config - the config object
 * @param topic - a Topic
 * @returns an object
 */
export async function LiveTimingAPIV1(config: Config, topic: Topic) {
    const data = await (
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
 * Call the Live Timing on V2 [NOT RECOMANDED USE GRAPHQL INSTEAD]
 *
 * @param config - the config object
 * @param topic - a Topic or an Array<Topic>
 * @returns an object
 */
export async function LiveTimingAPIV2(
    config: Config,
    topic: Topic | Array<Topic>
) {
    const data = await (
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
 * Call the Live Timing on GraphQL
 *
 * @param config - the config object
 * @param topic - a Topic or an Array<Topic>
 * @returns an object
 */
export async function LiveTimingAPIGraphQL(
    config: Config,
    topic: Topic | Array<Topic>
) {
    const { data } = await (
        await fetch(`http://${config.host}:${config.port}/api/graphql`, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                query: `query LiveTimingState {
                            liveTimingState {
                                ${
                                    typeof topic === 'object'
                                        ? topic.join('\n')
                                        : topic
                                }
                            }
                        }`,
                operationName: 'LiveTimingState',
            }),
            method: 'POST',
        })
    ).json();

    if (data.success === false) {
        return invalidTopic;
    } else {
        return data.liveTimingState;
    }
}

/**
 * Call the Live Timing on GraphQL
 *
 * @param config - the config object
 * @param topic - a Topic or an Array<Topic>
 * @returns an object
 */
export async function LiveTimingClockAPIGraphQL(
    config: Config,
    topic: ClockTopic | Array<ClockTopic>
) {
    const { data } = await (
        await fetch(`http://${config.host}:${config.port}/api/graphql`, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                query: `query LiveTimingClock {
                            liveTimingClock {
                                ${
                                    typeof topic === 'object'
                                        ? topic.join('\n')
                                        : topic
                                }
                            }
                        }`,
                operationName: 'LiveTimingClock',
            }),
            method: 'POST',
        })
    ).json();

    if (data.success === false) {
        return invalidTopic;
    } else {
        return data.liveTimingClock;
    }
}

// curl --request POST \
//     --header 'content-type: application/json' \
//     --url  \
//     --data '{"query":"query ExampleQuery {\n  liveTimingState {\n    TrackStatus\n  }\n}"}'
