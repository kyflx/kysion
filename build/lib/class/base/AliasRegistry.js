"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasRegistry = void 0;
const discord_js_1 = require("discord.js");
const Registry_1 = require("./Registry");
class AliasRegistry extends Registry_1.Registry {
    constructor() {
        super(...arguments);
        this.aliases = new discord_js_1.Collection();
    }
    get(key) {
        var _a;
        return (_a = super.get(key)) !== null && _a !== void 0 ? _a : this.aliases.get(key);
    }
    has(key) {
        return super.has(key) || this.aliases.has(key);
    }
    set(piece) {
        const aliasPiece = super.set(piece);
        if (!aliasPiece)
            return undefined;
        for (const alias of aliasPiece.aliases)
            this.aliases.set(alias, aliasPiece);
        return aliasPiece;
    }
    delete(key) {
        const aliasPiece = this.resolve(key);
        if (!aliasPiece)
            return false;
        for (const alias of aliasPiece.aliases)
            this.aliases.delete(alias);
        return super.delete(aliasPiece);
    }
    ;
    clear() {
        super.clear();
        this.aliases.clear();
    }
}
exports.AliasRegistry = AliasRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxpYXNSZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2xhc3MvYmFzZS9BbGlhc1JlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLDJDQUFzQztBQUV0Qyx5Q0FBb0M7QUFFcEMsTUFBYSxhQUFvQyxTQUFRLG1CQUFXO0lBQXBFOztRQUlRLFlBQU8sR0FBMEIsSUFBSSx1QkFBVSxFQUFFLENBQUM7SUFpRDFELENBQUM7SUExQ08sR0FBRyxDQUFDLEdBQVc7O1FBQ3JCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUNBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLEdBQUcsQ0FBQyxHQUFXO1FBQ3JCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBT00sR0FBRyxDQUFDLEtBQVE7UUFDbEIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBR2xDLEtBQUssTUFBTSxLQUFLLElBQUksVUFBVSxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFNUUsT0FBTyxVQUFVLENBQUM7SUFDbkIsQ0FBQztJQU9NLE1BQU0sQ0FBQyxHQUFlO1FBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM5QixLQUFLLE1BQU0sS0FBSyxJQUFJLFVBQVUsQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFBQSxDQUFDO0lBS0ssS0FBSztRQUNYLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBckRELHNDQXFEQyJ9