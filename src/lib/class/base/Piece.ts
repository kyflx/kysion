/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Kysion } from "../../Kysion";
import { Constants } from "../../util/Constants";
import Util from "../../util/Util";
import { Registry } from "./Registry";
import { join } from "path";

export interface PieceOptions {
  /**
   * Define the name of this piece. Like category, if omitted it will take it from the file path.
   */
  name?: string;
  /**
   * Whether this piece will be enabled or disabled.
   */
  enabled?: boolean;
}

export class Piece {
  /**
   * The kysion client that controls everything even our life.
   */
  public client: Kysion;
  /**
   * The registry that loaded this piece.
   */
  public registry: Registry<Piece>;

  /**
   * The name of this piece.
   */
  public name: string;
  /**
   * Whether the piece is enabled or not.
   */
  public enabled: boolean;

  /**
   * The full category for the piece.
   */
  public fullCategory: string[];
  /**
   * The directory this piece is located in.
   */
  public directory: string;
  /**
   * The file location where this piece is stored.
   */
  public file: string[];

  /**
   * @param options - The options for this piece.
   * @since 0.0.0-alpha
   */
  public constructor(options: PieceOptions) {
    options = Util.mergeObjects(options, Constants.DEFAULTS.PIECE._);

    this.name = options.name;
    this.enabled = options.enabled;
  }

  _init(registry: Registry<Piece>, directory: string, file: string[]): this {
    // Registry and Client.
    this.client = registry.client;
    this.registry = registry;

    // File Stuff
    this.directory = directory;
    this.file = file;
    this.fullCategory = file.slice(0, -1);

    return this;
  }

  public init(): any {
    return;
  }

  /**
   * The type of piece this is.
   * @since 0.0.0-alpha
   */
  public get type(): string {
    return this.registry.name.slice(0, -1);
  }

  /**
   * The absolute path to this piece.
   */
  public get path(): string {
    return join(this.directory, ...this.file);
  }

  /**
   * Reloads this piece.
   * @since 0.0.0-alpha
   */
  public async reload(): Promise<this> {
    // TODO: create this stuff in the registry.
    return this;
  }

  /**
   * Unloads this piece from the registry.
   * @since 0.0.0-alpha
   */
  public unload(): void {
    // TODO: create reload stuff in the registry.
    return;
  }

  /**
   * Disables this piece.
   * @since 0.0.0-alpha
   */
  public disable(): this {
    this.enabled = false;
    return this;
  }

  /**
   * Enables this piece.
   * @since 0.0.0-alpha
   */
  public enable(): this {
    this.enabled = true;
    return this;
  }

  /**
   * Defines toString behavior for pieces
   * @since 0.0.0-alpha
   */
  public toString(): string {
    return this.name;
  }

  /**
   * Defines the JSON.stringify behavior of this task.
   * @since 0.0.0-alpha
   */
  public toJSON() {
    return {
      name: this.name,
      path: this.path,
      file: this.file,
      directory: this.directory,
      type: this.type,
      enabled: this.enabled,
    };
  }
}
