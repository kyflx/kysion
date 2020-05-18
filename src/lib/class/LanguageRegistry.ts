/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Constants } from "../util/Constants";
import Util from "../util/Util";
import { Registry, RegistryOptions } from "./base/Registry";
import { Language } from "./Language";

export interface LanguageRegistryOptions extends RegistryOptions {
  /**
   * The default language to use.
   */
  defaultLanguage?: string;
}

export class LanguageRegistry extends Registry<Language> {
  public options: LanguageRegistryOptions;

  public constructor(options: LanguageRegistryOptions) {
    options = Util.mergeObjects(options, Constants.defaults.registry.command);
    super("commands", options);
  }

  /**
   * The default options set in the language registry options.
   * @since 0.0.0-alpha
   */
  public get default(): Language {
    return this.get(this.options.defaultLanguage) || null;
  }
}
