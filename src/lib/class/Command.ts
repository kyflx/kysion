/**
 * Copyright ©️ Kyflx Developments. All rights reserved.
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import { PermissionResolvable, Message } from "discord.js";
import { Registry } from "./base/Registry";
import { Language } from "./Language";
import {AliasPiece, AliasPieceOptions} from "./base/AliasPiece";

export type KeySupplier = (message: Message, args?: any) => string;
export type ExecutionPredicate = (message: Message) => boolean;

export interface CommandOptions extends AliasPieceOptions {
  autoAliases?: boolean;
  requiredPermissions?: PermissionResolvable;
  bucket?: number;
  cooldown?: number;
  cooldownLevel?: "author" | "channel" | "guild";
  deletable?: boolean;
  description?: string | string[] | ((language: Language) => string | string[]);
  extendedHelp?:
    | string
    | string[]
    | ((language: Language) => string | string[]);
  flagSupport?: boolean;
  guarded?: boolean;
  hidden?: boolean;
  nsfw?: boolean;
  permissionLevel?: number;
  promptLimit?: number;
  promptTime?: number;
  quotedStringSupport?: boolean;
  requiredSettings?: string[];
  runIn?: Array<"text" | "dm" | "news">;
  subcommands?: boolean;
  usage?: string;
  usageDelim?: string;
  regex?: RegExp;
  lock?: "guild" | "channel" | "user" | KeySupplier;
  condition?: ExecutionPredicate;
}

export class Command extends AliasPiece {
  public constructor(
    registry: Registry<Command>,
    directory: string,
    file: string[],
    options: CommandOptions
  ) {
    super(registry, directory, file, options);
  }

  public async run() {
    throw new Error(
      `${this.constructor.name ?? this.name}#run hasn't been implemented yet.`
    );
  }

  public static Setup(options?: CommandOptions) {
    return AliasPiece.Setup(options);
  }
}
