"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistry = void 0;
const Constants_1 = require("../util/Constants");
const Util_1 = __importDefault(require("../util/Util"));
const Registry_1 = require("./base/Registry");
class CommandRegistry extends Registry_1.Registry {
    constructor(options = {}) {
        options = Util_1.default.mergeObjects(options, Constants_1.Constants.defaults.registry.command);
        super("commands", options);
    }
}
exports.CommandRegistry = CommandRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZFJlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGFzcy9Db21tYW5kUmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsaURBQThDO0FBQzlDLHdEQUFnQztBQUNoQyw4Q0FBNEQ7QUFPNUQsTUFBYSxlQUFnQixTQUFRLG1CQUFpQjtJQUNwRCxZQUFtQixVQUEyQixFQUFFO1FBQzlDLE9BQU8sR0FBRyxjQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFMRCwwQ0FLQyJ9