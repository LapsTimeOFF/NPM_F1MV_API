# NPM_F1MV_API

> Talk with the [MulitiViewer](https://multiviewer.app/) API easily

- [Intro](#intro)
- [Install](#install)
- [Usage](#usage)
  - [Docs](#docs)
  - [Demos](#demos)
- [Projects](#projects)
- [Compatibility](#compatibility)
- [Credits](#credits)

## Intro

This package is a Node.js wrapper around [MulitiViewer](https://multiviewer.app/).

You can use it to start building projects using the MultiViewer Live Timing API...

## Install

```bash
npm install npm_f1mv_api
```

## Usage

```ts
import {
    discoverF1MVInstances,
    getAPIVersion,
    getF1MVVersion,
    LiveTimingAPIV1,
    LiveTimingAPIV2,
    LiveTimingAPIGraphQL,
} from "npm_f1mv_api";

(async () => {
    let port;

    try {
        port = (await discoverF1MVInstances("localhost")).port;
    } catch (error) {
        console.error(
            "No MultiViewer instances founded on the requested host. Check if MultiViewer is running or if MultiViewer is allowed in your FireWall rules."
        );
        return;
    }

    const config = {
        host: "localhost",
        port: port,
    };

    console.log(await discoverF1MVInstances(config.host));
    console.log(await getF1MVVersion(config));
    console.log(await getAPIVersion(config));
    console.log(await LiveTimingAPIV1(config, "TrackStatus"));
    console.log(await LiveTimingAPIV2(config, ["TrackStatus", "WeatherData"]));
    console.log(
        await LiveTimingAPIGraphQL(config, ["TrackStatus", "WeatherData"])
    );
})();
```

### Docs

See the [auto-generated docs](https://lapstimeoff.github.io/NPM_F1MV_API/modules.html) for more info on methods and parameters.

### Demos

To run the included demo:

1. clone repo
2. install node deps
3. then in your terminal run

```bash
ts-node test/demo.ts
```

## Projects

All of these awesome projects are built using the `npm_f1mv_api` package. 🤯

*Be the first to create a project !*

If you create a cool integration, feel free to open a PR and add it to the list.

## Compatibility

This package is ESM-only.

## Credits

- [Thanks to MultiViewer For F1 for the amazing software!](https:/multiviewer.app/)
