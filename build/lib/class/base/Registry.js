"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
const discord_js_1 = require("discord.js");
const Constants_1 = require("../../util/Constants");
const Util_1 = __importDefault(require("../../util/Util"));
const path_1 = require("path");
const fs = __importStar(require("fs-nextra"));
class Registry extends discord_js_1.Collection {
    constructor(name, options = {}) {
        options = Util_1.default.mergeObjects(options, Constants_1.Constants.defaults.registry._);
        super();
        this.name = name;
        this.directory = options.directory;
        this.loadFilter = options.loadFilter;
        this.extensions = options.extensions;
    }
    static get [Symbol.species]() {
        return discord_js_1.Collection;
    }
    static async walk(registry, directory = registry.directory) {
        const files = await fs.scan(directory, {
            filter: (stats, path) => stats.isFile() && path_1.extname(path) === ".js"
        }).catch(() => registry.client.options.createPiecesFolders ? fs.ensureDir(directory).catch(err => null) : null);
        if (!files)
            return;
        return Promise.all([...files.keys()].map(f => registry.load(directory, path_1.relative(directory, f).split(path_1.sep))));
    }
    _init(client) {
        this.client = client;
        return this;
    }
    init() {
        return Promise.all(this.map((p) => (p.enabled ? p.init() : p.unload())));
    }
    load(directory, file) {
        const loc = path_1.join(directory, ...file);
        let piece = null;
        try {
            const mod = (_ => { var _a; return (_a = _.default) !== null && _a !== void 0 ? _a : _; })(require(loc));
            if (!Util_1.default.isClass(mod))
                throw new TypeError("The exported structure is not a class.");
            piece = this.set(new mod(this, file, directory));
        }
        catch (error) {
            this.client.logger.error(error);
        }
        delete require.cache[loc];
        module.children.pop();
        return piece;
    }
    async loadAll() {
        this.clear();
        await Registry.walk(this);
        return this.size;
    }
    set(piece) {
        if (!(piece instanceof this.holds))
            throw new TypeError(`Only ${this} may be stored in this store.`);
        const existing = this.get(piece.name);
        if (existing)
            this.delete(existing);
        else if (this.client.listenerCount("pieceLoaded"))
            this.client.registries.emit("pieceLoaded", piece);
        return piece;
    }
    delete(resolvable) {
        const piece = this.resolve(resolvable);
        if (!piece)
            return false;
        super.delete(piece.name);
        return true;
    }
    resolve(resolvable) {
        if (resolvable instanceof this.holds)
            return resolvable;
        return this.get(resolvable);
    }
    toString() {
        return this.name;
    }
}
exports.Registry = Registry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsYXNzL2Jhc2UvUmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLDJDQUF3QztBQUV4QyxvREFBa0Q7QUFDbEQsMkRBQW1DO0FBRW5DLCtCQUFvRDtBQUNwRCw4Q0FBZ0M7QUEyQmhDLE1BQWEsUUFBMEIsU0FBUSx1QkFBcUI7SUFvQ25FLFlBQW1CLElBQVksRUFBRSxVQUEyQixFQUFFO1FBQzdELE9BQU8sR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUN0QyxDQUFDO0lBRU0sTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxPQUFPLHVCQUFVLENBQUM7SUFDbkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFrQixRQUFxQixFQUFFLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUztRQUM5RixNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxjQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSztTQUNsRSxDQUFDLENB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