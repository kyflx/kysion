# Kysion Framework &bull; [![Discord](https://img.shields.io/discord/696355996657909790.svg?logo=discord&colorB=7289DA&style=flat-square)](https://discord.gg/BnQECNd) [![Kysion Version](https://img.shields.io/badge/version-pre--alpha-blue?style=flat-square)](/#)

> A modular [Typescript](https://www.typescriptlang.org) only [discord.js](https://discord.js.org) framework with components from [klasajs](https://klasa.js.org).

Reasons you may want to use Kysion:

- ⛓️ **Klasa**: Kysion makes use of powerful klasajs components while still being a great alternative to klasa itself.
- 🔧 **Strictly Typed**: Kysion is strictly type to prevent silly little type errors when using it.

[Github](https://github.com/kyflx/kysion) &bull; [NPM](/#)

## Setup

Here is a basic setup of Kysion:

```ts
import { Kysion, MonitorManager, TaskManager } from "kysion";

/** Managers will be loaded in the order they were regestered in. */
new Kysion({ directory: __dirname })
  .use(new MonitorManager())
  .use(new TaskManager()
  .start(); // Loads all managers and logs in.
/** Load Order: monitors -> tasks */

declare module "kysion"

```

For better support join our [Discord Server](https://discord.gg/BnQECNd).

### Plugins

Plugins get called in the KysionCore constructor.

```ts
import { Kysion, KYSION_PLUGIN } from "kysion"

Kysion
  .use((this: Kysion) => this.logger.info("I made a kysion plugin!"));

// Or

const myPlugin = {
  [KYSION_PLUGIN](this: Kysion) {
    this.logger.info("I made a kysion plugin!");
  }
}

Kysion.use(myPlugin);

```

## Disclaimer

Kysion is in pre-alpha so there might be a lot of bugs or some weird methods/properties. If you want to contribute please join our [Discord Server](https://discord.gg/BnQECNd) so you can communicate with the developers.

---

Kyflx Developments &copy; 2020 - All Rights Reserved
