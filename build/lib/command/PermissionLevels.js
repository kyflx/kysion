"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionLevels = void 0;
const discord_js_1 = require("discord.js");
const EMPTY = Symbol("EmptyLevel");
class PermissionLevels extends discord_js_1.Collection {
    constructor(levels = 11) {
        super();
        for (let i = 0; i < levels; i++)
            this.set(i, EMPTY);
    }
    add(level, check, options = {}) {
        return this.set(level, { check, break: Boolean(options.break), fetch: Boolean(options.fetch) });
    }
    remove(level) {
        return this.set(level, EMPTY);
    }
    set(level, data) {
        if (level < 0)
            throw new Error(`Cannot set permission level ${level}. Permission levels start at 0.`);
        if (level > (this.size - 1))
            throw new Error(`Cannot set permission level ${level}. Permission levels stop at ${this.size - 1}.`);
        return super.set(level, data);
    }
    isValid() {
        return this.every(level => level === EMPTY || (typeof level === "object" && typeof level.break === 'boolean' && typeof level.fetch === 'boolean' && typeof level.check === 'function'));
    }
    debug() {
        const errors = [];
        for (const [index, level] of this) {
            if (typeof level === "symbol")
                continue;
            if (typeof level !== 'object')
                errors.push(`Permission level ${index} must be an object`);
            if (typeof level.break !== 'boolean')
                errors.push(`"break" in permission level ${index} must be a boolean`);
            if (typeof level.fetch !== 'boolean')
                errors.push(`"fetch" in permission level ${index} must be a boolean`);
            if (typeof level.check !== 'function')
                errors.push(`"check" in permission level ${index} must be a function`);
        }
        return errors.join('\n');
    }
    async run(message, min) {
        for (let i = min; i < this.size; i++) {
            const level = this.get(i);
            if (level === EMPTY)
                continue;
            if (level.fetch && !message.member && message.guild)
                await message.guild.members.fetch(message.author);
            const res = await level.check(message);
            if (res)
                return { broke: false, permission: true };
            if (level.break)
                return { broke: true, permission: false };
        }
        return { broke: false, permission: false };
    }
    static get [Symbol.species]() {
        return discord_js_1.Collection;
    }
}
exports.PermissionLevels = PermissionLevels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbkxldmVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tbWFuZC9QZXJtaXNzaW9uTGV2ZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDJDQUErQztBQUUvQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFpQ25DLE1BQWEsZ0JBQWlCLFNBQVEsdUJBQWdEO0lBTXJGLFlBQW1CLFNBQWlCLEVBQUU7UUFDckMsS0FBSyxFQUFFLENBQUM7UUFFUixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFTTSxHQUFHLENBQUMsS0FBYSxFQUFFLEtBQTJCLEVBQUUsVUFBa0MsRUFBRTtRQUMxRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBUU0sTUFBTSxDQUFDLEtBQWE7UUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBU00sR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFrQztRQUMzRCxJQUFJLEtBQUssR0FBRyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsS0FBSyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3RHLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUEr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