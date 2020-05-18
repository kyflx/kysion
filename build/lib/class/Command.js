"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const AliasPiece_1 = require("./base/AliasPiece");
class Command extends AliasPiece_1.AliasPiece {
    constructor(registry, directory, file, options) {
        super(registry, directory, file, options);
    }
    async run() {
        var _a;
        throw new Error(`${(_a = this.constructor.name) !== null && _a !== void 0 ? _a : this.name}#run hasn't been implemented yet.`);
    }
    static Setup(options) {
        return AliasPiece_1.AliasPiece.Setup(options);
    }
}
exports.Command = Command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2xhc3MvQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQSxrREFBZ0U7QUFtQ2hFLE1BQWEsT0FBUSxTQUFRLHVCQUFVO0lBQ3JDLFlBQ0UsUUFBMkIsRUFDM0IsU0FBaUIsRUFDakIsSUFBYyxFQUNkLE9BQXVCO1FBRXZCLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUc7O1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FDYixHQUFHLE1BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG1DQUFJLElBQUksQ0FBQyxJQUFJLG1DQUFtQyxDQUN6RSxDQUFDO0lBQ0osQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBd0I7UUFDMUMsT0FBTyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUFuQkQsMEJBbUJDIn0=