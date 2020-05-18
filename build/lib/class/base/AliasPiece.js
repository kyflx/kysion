"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasPiece = void 0;
const Piece_1 = require("./Piece");
class AliasPiece extends Piece_1.Piece {
    constructor(registry, directory, file, options) {
        var _a;
        super(registry, directory, file, options);
        this.aliases = (_a = options.aliases) !== null && _a !== void 0 ? _a : [];
    }
    toJSON() {
        return {
            ...super.toJSON(),
            aliases: this.aliases.slice(0)
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
exports.AliasPiece = AliasPiece;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxpYXNQaWVjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2xhc3MvYmFzZS9BbGlhc1BpZWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLG1DQUE4QztBQVM5QyxNQUFhLFVBQVcsU0FBUSxhQUFLO0lBYXBDLFlBQ0MsUUFBeUIsRUFDekIsU0FBaUIsRUFDakIsSUFBYyxFQUNkLE9BQTBCOztRQUUxQixLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLE9BQU8sU0FBRyxPQUFPLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQU1NLE1BQU07UUFDWixPQUFPO1lBQ04sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUIsQ0FBQztJQUNILENBQUM7SUFNTSxNQUFNLENBQUMsS0FBSyxDQUE4QixPQUFXO1FBQzNELE9BQU8sVUFBbUQsV0FBYztZQUN2RSxPQUFPLEtBQU0sU0FBUSxXQUFXO2dCQUMvQixZQUFZLEdBQUcsSUFBVztvQkFDekIsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixDQUFDO2FBQ0QsQ0FBQztRQUNILENBQUMsQ0FBQztJQUNILENBQUM7Q0FDRDtBQWhERCxnQ0FnREMifQ==