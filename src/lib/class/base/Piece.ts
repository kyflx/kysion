/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { join } from "path";
import { Kysion } from "../../Kysion";
import Util from "../../util/Util";
import { Registry } from "./Registry";

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
   * @param registry - The store this piece is for.
   * @param directory - The base directory to the pieces folder.
   * @param file - The path from the pieces folder to the piece file.
   * @param options - The options for this piece.
   * @since 0.0.0-alpha
   */
  public constructor(
    registry: Registry<Piece>,
    directory: string,
    file: string[],
    options: PieceOptions
  ) {
    const defaults = registry.options.defaults;
    if (defaults) options = Util.mergeObjects(defaults, options);

    this.client = registry.client;
    this.registry = registry;

    this.name = options.name ?? file[file.length - 1].slice(0, -3);
    this.enabled = options.enabled;
    this.directory = directory;
    this.file = file;
    this.fullCategory = file.slice(0, -1);
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
  public async reload(): Promise<Piece> {
    const piece = this.registry.load(this.directory, this.file);
    await piece.init();
    if (this.client.registries.listenerCount('pieceReloaded')) this.client.registries.emit('pieceReloaded', piece);
    return piece;
  }

  /**
   * Unloads this piece from the registry.
   * @since 0.0.0-alpha
   */
  public unload(): boolean {
    if (this.client.registries.listenerCount('pieceUnloaded')) this.client.registries.emit('pieceUnloaded', this);
    return this.registry.delete(this);
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

  /**
   * A typescript decorator to help out with cleanliness.
   * @param options - The piece options to pass.
   */
  public static Setup<O extends PieceOptions>(options?: O) {
    return function <T extends new (...args: any[]) => Piece>(constructor: T) {
      return class extends constructor {
        constructor(...args: any[]) {
          super(...args, options);
        }
      };
    };
  }
}
