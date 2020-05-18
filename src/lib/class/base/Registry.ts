/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Collection } from "discord.js";
import { Kysion } from "../../Kysion";
import { Constants }  from "../../util/Constants";
import Util from "../../util/Util";
import { Piece, PieceOptions } from "./Piece";
import { extname, join, relative, sep } from "path";
import * as fs from "fs-nextra";

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
	/**
	 * The default piece options for this registry.
	 */
	defaults?: PieceOptions;
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
	 * The piece defaults for this store.
	 */
	public options: RegistryOptions;

	/**
	 * A registry that loads and manages the pieces it contains.
	 * @param name - The name of this registry. e.g. Commands
	 * @param options - The options for this registry.
	 */
	public constructor(name: string, options: RegistryOptions = {}) {
		options = Util.mergeObjects(options, Constants.defaults.registry._);
		super();

		this.name = name;
		this.directory = options.directory;
		this.loadFilter = options.loadFilter;
		this.extensions = options.extensions;
	}

	public static get [Symbol.species](): typeof Collection {
		return Collection;
	}

	public static async walk<T extends Piece>(registry: Registry<T>, directory = registry.directory): Promise<T[]> {
		const files = await fs.scan(directory, {
			filter: (stats, path) => stats.isFile() && extname(path) === ".js"
		}).catch(() => registry.client.options.createPiecesFolders ? fs.ensureDir(directory).catch(err => registry.client.logger.error(err)) : null);
		if (!files) return;

		return Promise.all([...files.keys()].map(f => registry.load(directory, relative(directory, f).split(sep))));
	}

	_init(client: Kysion) {
		this.client = client;

		return this;
	}

	/**
	 * Initializes all pieces in this registry.
	 */
	public init() {
		return Promise.all(this.map((p) => (p.enabled ? p.init() : p.unload())));
	}

	public load(directory: string, file: string[]): T {
		const loc = join(directory, ...file);
		let piece: T = null;

		try {
			const mod = (_ => _.default ?? _)(require(loc));
			if (!Util.isClass(mod)) throw new TypeError("The exported structure is not a class.");
			piece = this.set(new mod(this, file, directory)) as T;
		} catch (error) {
			this.client.logger.error(error);
		}

		delete require.cache[loc];
		module.children.pop();

		return piece;
	}

	public async loadAll() {
		this.clear();
		await Registry.walk(this);
		return this.size;
	}

  /**
   * Sets up a piece in our store.
   * @param piece - The piece we are setting up.
   */
	// @ts-ignore
	public set(piece: T): T {
	  if (!(piece instanceof this.holds)) throw new TypeError(`Only ${this} may be stored in this store.`);

	  const existing = this.get(piece.name);
	  if (existing) this.delete(existing);
	  else if (this.client.listenerCount("pieceLoaded")) this.client.registries.emit("pieceLoaded", piece);

	  return piece;
  }

  /**
   * Deletes a piece from this store.
   * @param resolvable - A piece or a string representing a piece.
   */
  public delete(resolvable: T | string): boolean {
    const piece = this.resolve(resolvable);
    if (!piece) return false;
    super.delete(piece.name);
    return true;
  }

  /**
   * Resolves a string or piece into a piece object.
   * @param resolvable - The piece object or string representing a piece's name
   * @since 0.0.0-alpha
   */
  public resolve(resolvable: T | string): T {
    if (resolvable instanceof this.holds) return resolvable;
    return this.get(resolvable)
  }

  public toString(): string {
    return this.name;
  }
}
