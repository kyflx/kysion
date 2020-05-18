"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const Piece_1 = require("./base/Piece");
class Language extends Piece_1.Piece {
    get(term, ...args) {
        if (!this.enabled && this !== this.registry.default)
            return this.registry.default.get(term, ...args);
    }
}
exports.Language = Language;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NsYXNzL0xhbmd1YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHdDQUFxQztBQUdyQyxNQUFhLFFBQVMsU0FBUSxhQUFLO0lBRzFCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsR0FBRyxJQUFXO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87WUFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBUEQsNEJBT0MifQ==