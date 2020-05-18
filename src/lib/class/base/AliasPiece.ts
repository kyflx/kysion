/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { Registry } from "./Registry";
import { Piece, PieceOptions } from "./Piece";

export interface AliasPieceOptions extends PieceOptions {
	/**
	 * The aliases for this piece.
	 */
	aliases?: string[];
}

export class AliasPiece extends Piece {
	/**
	 * The aliases for this piece.
	 */
	public aliases: string[];

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
		options: AliasPieceOptions
	) {
		super(registry, directory, file, options);

		this.aliases = options.aliases ?? [];
	}

	/**
	 * Defines the JSON.stringify behavior of this task.
	 * @since 0.0.0-alpha
	 */
	public toJSON() {
		return {
			...super.toJSON(),
			aliases: this.aliases.slice(0)
		};
	}

	/**
	 * A typescript decorator to help out with cleanliness.
	 * @param options - The piece options to pass.
	 */
	public static Setup<O extends AliasPieceOptions>(options?: O) {
		return function <T extends new (...args: any[]) => Piece>(constructor: T) {
			return class extends constructor {
				constructor(...args: any[]) {
					super(...args, options);
				}
			};
		};
	}
}
