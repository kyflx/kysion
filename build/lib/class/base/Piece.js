"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = void 0;
const path_1 = require("path");
const Util_1 = __importDefault(require("../../util/Util"));
class Piece {
    constructor(registry, directory, file, options) {
        var _a;
        const defaults = registry.options.defaults;
        if (defaults)
            options = Util_1.default.mergeObjects(defaults, options);
        this.client = registry.client;
        this.registry = registry;
        this.name = (_a = options.name) !== null && _a !== void 0 ? _a : file[file.length - 1].slice(0, -3);
        this.enabled = options.enabled;
        this.directory = directory;
        this.file = file;
        this.fullCategory = file.slice(0, -1);
    }
    init() {
        return;
    }
    get type() {
        return this.registry.name.slice(0, -1);
    }
    get path() {
        return path_1.join(this.directory, ...this.file);
    }
    async reload() {
        const piece = this.registry.load(this.directory, this.file);
        await piece.init();
        if (this.client.registries.listenerCount('pieceReloaded'))
            this.client.registries.emit('pieceReloaded', piece);
        return piece;
    }
    unload() {
        if (this.client.registries.listenerCount('pieceUnloaded'))
            this.client.registries.emit('pieceUnloaded', this);
        return this.registry.delete(this);
    }
    disable() {
        this.enabled = false;
        return this;
    }
    enable() {
        this.enabled = true;
        return this;
    }
    toString() {
        return this.name;
    }
    toJSON() {
        return {
            name: this.name,
            path: this.path,
            file: this.file,
            directory: this.directory,
            type: this.type,
            enabled: this.enabled,
        };
    }
    static Setup(options) {
        return function (constructor) {
            return class extends constructor {
                constructor(...args) {
                    super(...args, options);
                }
            };
        };
    }
}
exports.Piece = Piece;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NsYXNzL2Jhc2UvUGllY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsK0JBQTRCO0FBRTVCLDJEQUFtQztBQWNuQyxNQUFhLEtBQUs7SUF1Q2hCLFlBQ0UsUUFBeUIsRUFDekIsU0FBaUIsRUFDakIsSUFBYyxFQUNkLE9BQXFCOztRQUVyQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUMzQyxJQUFJLFFBQVE7WUFBRSxPQUFPLEdBQUcsY0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLFNBQUcsT0FBTyxDQUFDLElBQUksbUNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLElBQUk7UUFDVCxPQUFPO0lBQ1QsQ0FBQztJQU1ELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFLRCxJQUFXLElBQUk7UUFDYixPQUFPLFdBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFNTSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9HLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQU1NLE1BQU07UUFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlHLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQU1NLE9BQU87UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFNTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBTU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBTU0sTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7SUFDSixDQUFDO0lBTU0sTUFBTSxDQUFDLEtBQUssQ0FBeUIsT0FBVztRQUNyRCxPQUFPLFVBQW1ELFdBQWM7WUFDdEUsT0FBTyxLQUFNLFNBQVEsV0FBVztnQkFDOUIsWUFBWSxHQUFHLElBQVc7b0JBQ3hCLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDMUIsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUF2SkQsc0JBdUpDIn0=