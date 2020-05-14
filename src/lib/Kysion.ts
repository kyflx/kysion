/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Client } from "discord.js";
import { Registry } from "./class/base/Registry";
import { Piece } from "./class/base/Piece";

/**
 * Kysion Client. Where every bot begins.
 * @extends Client
 * @since pre-alpha
 */
export class Kysion extends Client {
  /**
   * A set of registries that are being used.
   */
  public registries: Set<Registry<Piece>> = new Set();

  /**
   * Whether the bot has been started or not.
   */
  private started: boolean = false;

  /**
   * Use a registry along with your bot.
   * @param registry - The registry to use.
   */
  public use(registry: Registry<Piece>): this {
    if (this.registries.has(registry)) {
      throw new RangeError(
        `Registry "${
          registry.name ?? registry.constructor.name
        }" is already being used.`
      );
    }

    this.registries.add(registry);
    return this;
  }

  /**
   * Start your amazing bot. Loads all of the registries that are being used.
   * @param token - The token to login with.
   */
  public async start(token: string = this.token): Promise<void> {
    // TODO: create registry load method.
    await Promise.all([new Promise((res) => res())]);
    await this.login(token);
    this.started = true;
  }
}
