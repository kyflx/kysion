/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Piece } from "./base/Piece";
import {LanguageRegistry} from "./LanguageRegistry";

export class Language extends Piece {
  public registry: LanguageRegistry;

  public get(term: string, ...args: any[]): string | Function {
    if (!this.enabled && this !== this.registry.default)
      return this.registry.default.get(term, ...args);
  }
}
