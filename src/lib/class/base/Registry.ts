/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Kysion } from "../../Kysion";
import Util from "../../util/Util";
import { Constants } from "../../util/Constants";
import { Piece } from "./Piece";
import { Collection } from "discord.js";

type LoadFilter = (filePath: string) => boolean | Promise<boolean>;

export interface RegistryOptions {
  /**
   * The directory in which to load files. If omitted it will use the main project file as a reference.
   */
  directory?: string;
  /**
   * A load filter which gets called each time a file is loaded.
   */
  loadFilter?: LoadFilter;
  /**
   * File extensions to allow. Default is `.ts` and `.js`.
   */
  extensions?: string[];
  /**
   * What this registry holds.
   */
  holds?: typeof Piece;
}

export class Registry<T extends Piece> extends Collection<string, T> {
  /**
   * The client that's using this registry.
   */
  public client: Kysion;

  /**
   * The name of this registry.
   */
  public name: string;
  /**
   * The directory in which to load files from.
   */
  public directory: string;
  /**
   * The load filter to use when loading files.
   */
  public loadFilter: LoadFilter;
  /**
   * The extensions to load.
   */
  public extensions: string[];
  /**
   * The type of structure this registry holds
   */
  public holds: typeof Piece;

  /**
   * A registry that loads and manages the pieces it contains.
   * @param name - The name of this registry. e.g. Commands
   * @param options - The options for this registry.
   */
  public constructor(name: string, options: RegistryOptions = {}) {
    options = Util.mergeObjects(options, Constants.DEFAULTS.REGISTRY._);
    super();

    this.name = name;
    this.directory = options.directory;
    this.loadFilter = options.loadFilter;
    this.extensions = options.extensions;
  }

  _init(client: Kysion) {
    this.client = client;

    return this;
  }

  static get [Symbol.species](): any {
		return Collection;
	}
}
