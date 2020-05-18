"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRegistry = void 0;
const Constants_1 = require("../util/Constants");
const Util_1 = __importDefault(require("../util/Util"));
const Registry_1 = require("./base/Registry");
class LanguageRegistry extends Registry_1.Registry {
    constructor(options) {
        options = Util_1.default.mergeObjects(options, Constants_1.Constants.defaults.registry.command);
        super("commands", options);
    }
    get default() {
        return this.get(this.options.defaultLanguage) || null;
    }
}
exports.LanguageRegistry = LanguageRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2VSZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2xhc3MvTGFuZ3VhZ2VSZWdpc3RyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxpREFBOEM7QUFDOUMsd0RBQWdDO0FBQ2hDLDhDQUE0RDtBQVU1RCxNQUFhLGdCQUFpQixTQUFRLG1CQUFrQjtJQUd0RCxZQUFtQixPQUFnQztRQUNqRCxPQUFPLEdBQUcsY0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUscUJBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQU1ELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDeEQsQ0FBQztDQUNGO0FBZkQsNENBZUMifQ==