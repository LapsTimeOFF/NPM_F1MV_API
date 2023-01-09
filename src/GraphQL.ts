import { Config } from "./Types";

export async function customGraphQL(config: Config, body: object, variables: object, operationName: string) {
    const response = await fetch(`http://${config.host}:${config.port}/api/graphql`, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            query: body,
            variables,
            operationName,
        }),
        method: "POST",
    });

    return await response.json();
}