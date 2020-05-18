"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const { getPromiseDetails } = process.binding("util");
class Type {
    constructor(value, parent) {
        this.childKeys = new Map();
        this.childValues = new Map();
        this.value = value;
        this.is = Type.resolve(value);
        this.parent = parent;
    }
    get childTypes() {
        if (!this.childValues.size)
            return '';
        return `<${(this.childKeys.size ? `${Type.list(this.childKeys)}, ` : '') + Type.list(this.childValues)}>`;
    }
    static resolve(value) {
        const type = typeof value;
        switch (type) {
            case "object":
                return value === null ? "null" : (value.constructor && value.constructor.name) || "any";
            case "function":
                return `${value.constructor.name}(${value.length}-arity`;
            case "undefined":
                return "void";
            default:
                return type;
        }
    }
    static list(values) {
        return values.has("any") ? "any" : [...values.values()].sort().join(" | ");
    }
    toString() {
        this.check();
        return this.is + this.childTypes;
    }
    addValue(value) {
        const child = new Type(value, this);
        this.childValues.set(child.is, child);
    }
    addEntry([key, value]) {
        const child = new Type(key, this);
        this.childKeys.set(child.is, child);
        this.addValue(value);
    }
    *parents() {
        let current = this;
        while (current = current.parent)
            yield current;
    }
    check() {
        if (Object.isFrozen(this))
            return;
        const promise = getPromiseDetails(this.value);
        if (typeof this.value === "object" && this.isCircular())
            this.is = `[Circular:${this.is}`;
        else if (promise && promise[0])
            this.addValue(promise[1]);
        else if (this.value instanceof Map)
            for (const entry of this.value)
                this.addEntry(entry);
        else if (Array.isArray(this.value) || this.value instanceof Set)
            for (const value of this.value)
                this.addValue(value);
        else if (this.is === "Object")
            this.is = 'any';
        Object.freeze(this);
    }
    isCircular() {
        for (const parent of this.parents())
            if (parent.value === this.value)
                return true;
        return false;
    }
}
exports.Type = Type;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbC9UeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFcEQsTUFBYSxJQUFJO0lBNEJoQixZQUFtQixLQUFVLEVBQUUsTUFBYTtRQVhwQyxjQUFTLEdBQXNCLElBQUksR0FBRyxFQUFFLENBQUM7UUFJekMsZ0JBQVcsR0FBc0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQVFsRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUMzRyxDQUFDO0lBT08sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFVO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLE9BQU8sS0FBSyxDQUFDO1FBQzFCLFFBQVEsSUFBSSxFQUFFO1lBQ2IsS0FBSyxRQUFRO2dCQUNaLE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FB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