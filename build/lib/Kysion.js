"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kysion = void 0;
const discord_js_1 = require("discord.js");
const CommandRegistry_1 = require("./class/CommandRegistry");
const events_1 = require("events");
const Logger_1 = require("./util/Logger");
const path_1 = require("path");
class Kysion extends discord_js_1.Client {
    constructor(options = {}) {
        var _a, _b, _c;
        super(options);
        this.options = options;
        this.registries = new events_1.EventEmitter();
        this.started = false;
        this._registries = new Set();
        this.directory = (_a = options.directory) !== null && _a !== void 0 ? _a : path_1.dirname(require.main.filename);
        this.logger = (_b = options.logger) !== null && _b !== void 0 ? _b : new Logger_1.KysionLogger();
        this.use(new CommandRegistry_1.CommandRegistry(((_c = options.registries) !== null && _c !== void 0 ? _c : {}).commands));
    }
    use(registry) {
        var _a;
        if (this._registries.has(registry)) {
            throw new RangeError(`Registry "${(_a = registry.name) !== null && _a !== void 0 ? _a : registry.constructor.name}" is already being used.`);
        }
        this._registries.add(registry._init(this));
        Object.defineProperty(this, registry.name, { value: registry });
        if (this.started)
            registry.loadAll().then(() => true);
        return this;
    }
    async start(token = this.token) {
        await Promise.all([...this._registries].map(r => r.loadAll()));
        await this.login(token);
        this.started = true;
        return this;
    }
}
exports.Kysion = Kysion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS3lzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9LeXNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsMkNBQXlEO0FBR3pELDZEQUdpQztBQUNqQyxtQ0FBc0M7QUFDdEMsMENBQXNEO0FBQ3RELCtCQUErQjtBQWtDL0IsTUFBYSxNQUFPLFNBQVEsbUJBQU07SUFnQ2hDLFlBQTBCLFVBQXlCLEVBQUU7O1FBQ25ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURTLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBcEI5QyxlQUFVLEdBQWlCLElBQUkscUJBQVksRUFBRSxDQUFDO1FBYzdDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFJekIsZ0JBQVcsR0FBeUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUtwRCxJQUFJLENBQUMsU0FBUyxTQUFHLE9BQU8sQ0FBQyxTQUFTLG1DQUFJLGNBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxNQUFNLFNBQUcsT0FBTyxDQUFDLE1BQU0sbUNBQUksSUFBSSxxQkFBWSxFQUFFLENBQUM7UUFFbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGlDQUFlLENBQUMsT0FBQyxPQUFPLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFNTSxHQUFHLENBQUMsUUFBeUI7O1FBQ2xDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLFVBQVUsQ0FDbEIsYUFDRSxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFDeEMsMEJBQTBCLENBQzNCLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsT0FBTztZQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBTU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFnQixJQUFJLENBQUMsS0FBSztRQUMzQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQXZFRCx3QkF1RUMifQ==