/**
 * Originally created by Dirigeants.
 */

import { Collection } from "discord.js";
import { Ratelimit } from "./Ratelimit";

type SweepPredicate = (rl: Ratelimit) => boolean;

export class RatelimitManager extends Collection<string, Ratelimit> {
	private sweepInterval: NodeJS.Timeout;
	private _bucket: number;
	private _cooldown: number;

	/**
	 * @since 0.0.0-alpha
	 * @param bucket - The amount of times a ratelimit can drip before it's limited.
	 * @param cooldown - The amount of milliseconds for the ratelimit's from this manager to expire.
	 */
	constructor(bucket: number, cooldown: number) {
		super();

		Object.defineProperty(this, 'sweepInterval', { value: null, writable: true });
		Object.defineProperty(this, '_bucket', { value: bucket, writable: true });
		Object.defineProperty(this, '_cooldown', { value: cooldown, writable: true });
	}

	/**
	 * The amount of times a ratelimit from this manager can drip before it's limited.
	 * @since 0.0.0-alpha
	 */
	public get bucket(): number {
		return this._bucket;
	}

	/**
	 * The amount of milliseconds for the ratelimit's from this manager to expire.
	 * @since 0.0.0-alpha
	 */
	public get cooldown(): number {
		return this._cooldown;
	}

	/**
	 * Gets a ratelimit from this manager or creates it if it doesn't exist.
	 * @param id - The id of the ratelimit
	 * @since 0.0.0-alpha
	 */
	public acquire(id: string): Ratelimit {
		return this.get(id) || this.create(id);
	}

	/**
	 * Creates a ratelimit for this manager.
	 * @param id - The id the ratelimit belongs to.
	 * @since 0.0.0-alpha
	 */
	public create(id: string): Ratelimit {
		const ratelimit = new Ratelimit(this._bucket, this._cooldown);
		this.set(id, ratelimit);
		return ratelimit;
	}

	/**
	 * Wraps {@link Collection}'s set method to set interval to sweep inactive ratelimit's.
	 * @param id - The id the ratelimit belongs to.
	 * @param rateLimit - The ratelimit to set.
	 * @since 0.0.0-alpha
	 */
	public set(id: string, rateLimit: Ratelimit): this {
		if (!(rateLimit instanceof Ratelimit)) throw new TypeError('Invalid RateLimit');
		if (!this.sweepInterval) this.sweepInterval = setInterval(this.sweep.bind(this), 30000);
		return super.set(id, rateLimit);
	}

	/**
	 * Wraps {@link Collection}'s sweep method to clear the interval when this manager is empty.
	 * @param fn - The filter predicate.
	 * @param thisArg - The this for the sweep predicate.
	 * @since 0.0.0-alpha
	 */
	// @ts-ignore
	private sweep(fn: SweepPredicate, thisArg: any): number {
		const amount = super.sweep(fn, thisArg);

		if (this.size === 0) {
			clearInterval(this.sweepInterval);
			this.sweepInterval = null;
		}

		return amount;
	}
}
