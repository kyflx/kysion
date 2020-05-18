/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import {Collection} from "discord.js";
import {AliasPiece} from "./AliasPiece";
import {Registry} from "./Registry";

export class AliasRegistry<T extends AliasPiece> extends Registry<T> {
	/**
	 * The different aliases that represent the pieces in this store.
	 */
	public aliases: Collection<string, T> = new Collection();

	/**
	 * Returns an AliasPiece in the store if it exists by its name or by an alias.
	 * @param key - The piece name or an alias.
	 * @since 0.0.0-alpha
	 */
	public get(key: string): T {
		return super.get(key) ?? this.aliases.get(key);
	}

	public has(key: string): boolean {
		return super.has(key) || this.aliases.has(key);
	}

	/**
	 * Sets up an alias piece in our store.
	 * @param piece - The piece we are setting up.
	 * @since 0.0.0-alpha
	 */
	public set(piece: T): T {
		const aliasPiece = super.set(piece);
		if (!aliasPiece) return undefined;

		// @ts-ignore
		for (const alias of aliasPiece.aliases) this.aliases.set(alias, aliasPiece);

		return aliasPiece;
	}

	/**
	 * Deletes an alias piece from the store.
	 * @param key - An alias piece or a string representing an alias piece or alias name.
	 * @since 0.0.0-alpha
	 */
	public delete(key: T | string): boolean {
		const aliasPiece = this.resolve(key);
		if (!aliasPiece) return false;
		for (const alias of aliasPiece.aliases) this.aliases.delete(alias);
		return super.delete(aliasPiece);
	};

	/**
	 * Clears all of the alias pieces and their aliases.
	 */
	public clear(): void {
		super.clear();
		this.aliases.clear();
	}
}
