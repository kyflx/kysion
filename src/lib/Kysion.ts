/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Client, ClientOptions, User } from "discord.js";
import { Piece } from "./class/base/Piece";
import { Registry } from "./class/base/Registry";
import {
  CommandRegistry,
  CommandRegistryOptions,
} from "./class/CommandRegistry";
import { EventEmitter } from "events";
import {KysionLogger, LoggerAPI} from "./util/Logger";
import { dirname } from "path";

export interface KysionOptions extends ClientOptions {
  /**
   * The directory in which to load pieces.
   */
  directory?: string;
  /**
   * The owners of the bot.
   */
  owners?: string | string[];
  /**
   * The options for the required registries.
   */
  registries?: {
    commands?: CommandRegistryOptions;
    events?: null;
    arguments?: null;
  };
  /**
   * Whether to create the pieces folders if they don't exist or not.
   */
  createPiecesFolders?: boolean;
  /**
   * A custom logger to use. Must follow our logger api.
   */
  logger?: LoggerAPI;
}

/**
 * Kysion Client. Where every bot begins.
 * @extends Client
 * @since pre-alpha
 */
export class Kysion extends Client {
  /**
   * The base directory of the bot. Used for loading pieces.
   */
  public directory: string;
  /**
   * The set of owners that developed this amazing bot.
   */
  public owners: Set<User>;
  /**
   * The global registries event emitter.
   */
  public registries: EventEmitter = new EventEmitter();
  /**
   * The client logger.
   */
  public logger: LoggerAPI;

  /**
   * The built in commands registry.
   */
  public commands: CommandRegistry;

  /**
   * Whether the bot has been started or not.
   */
  private started: boolean = false;
  /**
   * A set of registries that are being used.
   */
  private _registries: Set<Registry<Piece>> = new Set();

  public constructor(public options: KysionOptions = {}) {
    super(options);

    this.directory = options.directory ?? dirname(require.main.filename);
    this.logger = options.logger ?? new KysionLogger();

    this.use(new CommandRegistry((options.registries ?? {}).commands));
  }

  /**
   * Use a registry along with your bot.
   * @param registry - The registry to use.
   */
  public use(registry: Registry<Piece>): this {
    if (this._registries.has(registry)) {
      throw new RangeError(
        `Registry "${
          registry.name ?? registry.constructor.name
        }" is already being used.`
      );
    }

    this._registries.add(registry._init(this));
    Object.defineProperty(this, registry.name, { value: registry });
    if (this.started) registry.loadAll().then(() => true);

    return this;
  }

  /**
   * Start your amazing bot. Loads all of the registries that are being used.
   * @param token - The token to login with.
   */
  public async start(token: string = this.token): Promise<Kysion> {
    await Promise.all([...this._registries].map(r => r.loadAll()));
    await this.login(token);
    this.started = true;
    return this;
  }
}
