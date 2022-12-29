import { invalidTopic } from './Errors';
import { Config, Topic } from './Types';

/**
 * Call the Live Timing on V1 [DEPRECATED]
 *
 * @deprecated
 * @param config - the config object
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
export async function LiveTimingAPIV2(config: Config, topic: Topic | Array<Topic>) {
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
