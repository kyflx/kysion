"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static isObject(input) {
        return input && input.constructor === Object;
    }
    static isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    }
    static mergeObjects(target, source) {
        for (const key in source)
            target[key] = Util.isObject(source[key])
                ? Util.mergeObjects(target[key], source[key])
                : source[key];
        return target;
    }
}
exports.default = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbC9VdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBcUIsSUFBSTtJQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQVU7UUFDL0IsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUM7SUFDL0MsQ0FBQztJQU9NLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBVTtRQUM5QixPQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVU7WUFDaEMsT0FBTyxLQUFLLENBQUMsU0FBUyxLQUFLLFFBQVE7WUFDbkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNLENBQUMsWUFBWSxDQUd4QixNQUFTLEVBQUUsTUFBUztRQUNwQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU07WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQTFCRCx1QkEwQkMifQ==