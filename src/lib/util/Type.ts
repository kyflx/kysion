/**
 * Originally created by Dirigeants.
 */

// @ts-ignore
const {getPromiseDetails} = process.binding("util");

export class Type {
	/**
	 * The value to generate a deep Type of.
	 */
	public value: any;
	/**
	 * The shallow type of this.
	 */
	public is: string;

	/**
	 * The parent of this Type.
	 */
	private parent: Type;
	/**
	 * The child keys of this Type.
	 */
	private childKeys: Map<string, Type> = new Map();
	/**
	 * The child values of this Type.
	 */
	private childValues: Map<string, Type> = new Map();

	/**
	 * @since 0.0.0-alpha
	 * @param value - The value to generate a deep type of.
	 * @param parent - The parent value used in recursion.
	 */
	public constructor(value: any, parent?: Type) {
		this.value = value;
		this.is = Type.resolve(value);
		this.parent = parent;
	}

	public get childTypes(): string {
		if (!this.childValues.size) return '';
		return `<${(this.childKeys.size ? `${Type.list(this.childKeys)}, ` : '') + Type.list(this.childValues)}>`;
	}

	/**
	 * Resolves the type name that defines the input.
	 * @param value - The value to get the type name of.
	 * @since 0.0.0-alpha
	 */
	private static resolve(value: any): string {
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

	/**
	 * Joins the list of child types.
	 * @param values - The values to list.
	 * @since 0.0.0-alpha
	 */
	private static list(values: Map<string, Type>): string {
		return values.has("any") ? "any" : [...values.values()].sort().join(" | ");
	}

	/**
	 * The full type string generated.
	 * @since 0.0.0-alpha
	 */
	public toString(): string {
		this.check();
		return this.is + this.childTypes;
	}

	/**
	 * The subtype to create based on this.value's sub value.
	 * @param value - The sub-value
	 * @since 0.0.0-alpha
	 */
	private addValue(value: any): void {
		const child = new Type(value, this);
		this.childValues.set(child.is, child);
	}

	/**
	 * The subtype to create based on this.value's entries.
	 * @since 0.0.0-alpha
	 */
	private addEntry([key, value]: [string, any]): void {
		const child = new Type(key, this);
		this.childKeys.set(child.is, child);
		this.addValue(value);
	}

	/**
	 * Walks the linked list backwards, for checking circulars.
	 */
	private* parents() {
		let current = this;
		// @ts-ignore
		while (current = current.parent) yield current;
	}

	/**
	 * Get the deep type name that defines the input.
	 * @since 0.0.0-alpha
	 */
	private check() {
		if (Object.isFrozen(this)) return;

		const promise = getPromiseDetails(this.value);

		if (typeof this.value === "object" && this.isCircular()) this.is = `[Circular:${this.is}`;
		else if (promise && promise[0]) this.addValue(promise[1]);
		else if (this.value instanceof Map) for (const entry of this.value) this.addEntry(entry);
		else if (Array.isArray(this.value) || this.value instanceof Set) for (const value of this.value) this.addValue(value);
		else if (this.is === "Object") this.is = 'any';

		Object.freeze(this);
	}

	/**
	 * Checks if the value of this Type is a circular reference to any parent.
	 * @since 0.0.0-alpha
	 */
	private isCircular(): boolean {
		for (const parent of this.parents()) if (parent.value === this.value) return true;
		return false;
	}
}
