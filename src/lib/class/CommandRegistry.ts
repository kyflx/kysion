/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Constants } from "../util/Constants";
import Util from "../util/Util";
import { Registry, RegistryOptions } from "./base/Registry";
import { Command, CommandOptions } from "./Command";

export interface CommandRegistryOptions extends RegistryOptions {
  defaults?: CommandOptions;
}

export class CommandRegistry extends Registry<Command> {
  public constructor(options: RegistryOptions = {}) {
    options = Util.mergeObjects(options, Constants.defaults.registry.command);
    super("commands", options);
  }
}
