/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { PieceOptions } from "../class/base/Piece";
import { RegistryOptions } from "../class/base/Registry";

export interface Constants {
  DEFAULTS: {
    PIECE: {
      _: PieceOptions;
    };
    REGISTRY: {
      _: RegistryOptions;
    };
  };
}

export const Constants: Constants = {
  DEFAULTS: {
    PIECE: {
      _: {
        enabled: true,
      },
    },
    REGISTRY: {
      _: {
        directory: null,
        loadFilter: () => true,
        extensions: [".ts", ".js"],
      },
    },
  },
};
