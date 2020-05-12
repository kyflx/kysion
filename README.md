# Kysion Framework &bull; [![Discord](https://img.shields.io/discord/696355996657909790.svg?logo=discord&colorB=7289DA&style=flat-square)](https://discord.gg/BnQECNd) [![Kysion Version](https://img.shields.io/badge/version-pre--alpha-blue?style=flat-square)](/#)

> A modular [Typescript](https://www.typescriptlang.org) only discord.js framework with components from klasajs.

Reasons you may want to use Kysion:

- 📦 **Modular**: Each part of kysion is completely modular you don't have to use any of the bundled components..
- ⛓️ **Klasa**: Kysion makes use of powerful klasajs components while still being a great alternative to klasa itself.
- 🔧 **Strictly Typed**: Kysion is strictly type to prevent silly little type errors when using it.

[Github](https://github.com/kyflx/kysion-framework) &bull; [NPM](/#)

## Setup

Here is a basic setup of Kysion:

```ts
import { KysionCore } from "kysion"

new KysionCore({ directory: __dirname });
  .use(new CommandManager(/** Directory Name - e.g "cmds" -> /$cwd/build/cmds or options {...} */))
  .use(new EventsManager(/** Same as above */))
  .start(); // Loads all

```

For better support join our [Discord Server](https://discord.gg/BnQECNd).

### Plugins

Plugins get called in the KysionCore constructor.

```ts
import { KysionCore, KYSION_PLUGIN } from "kysion"

KysionCore
  .use((this: KysionCore) => this.logger.info("I made a kysion plugin!"));

// Or

const myPlugin = {
  [KYSION_PLUGIN](this: KysionCore) {
    this.logger.info("I made a kysion plugin!");
  }
}

KysionCore.use(myPlugin);

```

## Disclaimer

Kysion is in pre-alpha so there might be a lot of bugs or some weird methods/properties. If you want to contribute please join our [Discord Server](https://discord.gg/BnQECNd) so you can communicate with the developers.

---

Kyflx Developments &copy; 2020 - All Rights Reserved
