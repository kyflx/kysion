/**
 * Originally created by Dirigeants.
 */

import {Collection, Message} from "discord.js";

const EMPTY = Symbol("EmptyLevel");

type PermissionLevelCheck = (message: Message) => boolean | Promise<boolean>;

interface PermissionLevelOptions {
	/**
	 * Whether the loop breaks execution of higher levels
	 */
	break?: boolean;
	/**
	 * Whether the permission level should auto fetch a member or not
	 */
	fetch?: boolean;
}

interface PermissionLevelData extends PermissionLevelOptions {
	/**
	 * The permission level check.
	 */
	check: PermissionLevelCheck;
}

interface PermissionLevelsResult {
	/**
	 * Whether the loop broke execution of higher levels.
	 */
	broke: boolean;
	/**
	 * Whether the permission level check passed or not.
	 */
	permission: boolean;
}

export class PermissionLevels extends Collection<number, PermissionLevelData | symbol> {
	/**
	 * Creates a new PermissionLevels
	 * @param levels - How many permission levels there should be.
	 * @since 0.0.0-alpha
	 */
	public constructor(levels: number = 11) {
		super();

		for (let i = 0; i < levels; i++) this.set(i, EMPTY);
	}

	/**
	 * Adds a level to this levels cache.
	 * @param level - The permission number for the level you are defining
	 * @param check - The permission checking function
	 * @param options - If the permission should auto fetch members
	 * @since 0.0.0-alpha
	 */
	public add(level: number, check: PermissionLevelCheck, options: PermissionLevelOptions = {}): PermissionLevels {
		return this.set(level, {check, break: Boolean(options.break), fetch: Boolean(options.fetch)});
	}


	/**
	 * Removes levels from the levels cache
	 * @param level - The permission number for the level you are removing
	 * @since 0.0.0-alpha
	 */
	public remove(level: number): this {
		return this.set(level, EMPTY);
	}

	/**
	 * Adds levels to the levels cache to be converted to valid permission structure
	 *
	 * @param level - The permission number for the level you are defining
	 * @param data - Whether the level should break (stop processing higher levels, and inhibit a no permission error)
	 * @since 0.0.0-alpha
	 */
	public set(level: number, data: PermissionLevelData | symbol) {
		if (level < 0) throw new Error(`Cannot set permission level ${level}. Permission levels start at 0.`);
		if (level > (this.size - 1)) throw new Error(`Cannot set permission level ${level}. Permission levels stop at ${this.size - 1}.`);
		return super.set(level, data);
	}

	/**
	 * Checks if all permission levels are valid.
	 * @since 0.0.0-alpha
	 */
	public isValid(): boolean {
		return this.every(level => level === EMPTY || (typeof level === "object" && typeof level.break === 'boolean' && typeof level.fetch === 'boolean' && typeof level.check === 'function'))
	}

	public debug() {
		const errors = [];
		for (const [index, level] of this) {
			if (typeof level === "symbol") continue;
			if (typeof level !== 'object') errors.push(`Permission level ${index} must be an object`);
			if (typeof level.break !== 'boolean') errors.push(`"break" in permission level ${index} must be a boolean`);
			if (typeof level.fetch !== 'boolean') errors.push(`"fetch" in permission level ${index} must be a boolean`);
			if (typeof level.check !== 'function') errors.push(`"check" in permission level ${index} must be a function`);
		}
		return errors.join('\n');
	}

	/**
	 * Runs the defined permissionLevels
	 * @param message - The message to pass to perm level functions
	 * @param min - The minimum permissionLevel ok to pass
	 * @since 0.0.0-alpha
	 */
	async run(message: Message, min: number): Promise<PermissionLevelsResult> {
		for (let i = min; i < this.size; i++) {
			const level = this.get(i);
			if (level === EMPTY) continue;
			// @ts-ignore
			if (level.fetch && !message.member && message.guild) await message.guild.members.fetch(message.author);

			// @ts-ignore
			const res = await level.check(message);
			if (res) return {broke: false, permission: true};
			// @ts-ignore
			if (level.break) return {broke: true, permission: false};
		}
		return {broke: false, permission: false};
	}

	public static get [Symbol.species](): any {
		return Collection;
	}
}
