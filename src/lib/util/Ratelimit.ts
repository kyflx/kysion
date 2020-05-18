/**
 * Originally created by Dirigeants.
 */

export class Ratelimit {
	/**
	 * The number of requests before this is limited.
	 */
	public bucket: number;
	/**
	 * The amount of milliseconds for the ratelimit to expire.
	 */
	public cooldown: number;
	/**
	 * The remaining times this ratelimit can be dripped before the ratelimit bucket is empty
	 */
	public remaining: number;
	/**
	 * When this ratelimit is reset back to a full state
	 */
	public time: number;

	/**
	 * @since 0.0.0-alpha
	 * @param bucket - The number of requests before this is limited.
	 * @param cooldown - The amount of milliseconds for the ratelimit to expire.
	 */
	public constructor(bucket: number, cooldown: number) {
		this.bucket = bucket;
		this.cooldown = cooldown;
		this.reset();
	}

	/**
	 * Whether this ratelimit is expired or not, allowing the bucket to be reset.
	 * @since 0.0.0-alpha
	 */
	public get expired(): boolean {
		return this.remainingTime === 0;
	}

	/**
	 * Whether this ratelimit is limited or not.
	 * @since 0.0.0-alpha
	 */
	public get limited(): boolean {
		return !(this.remaining > 0 || this.expired);
	}

	/**
	 * The remaining time in milliseconds before this ratelimit instance is reset.
	 * @since 0.0.0-alpha
	 */
	public get remainingTime(): number {
		return Math.max(this.time - Date.now(), 0);
	}

	/**
	 * Drips the ratelimit bucket.
	 * @since 0.0.0-alpha
	 */
	public drip(): Ratelimit {
		if (this.limited) throw new Error("Ratelimited!");
		if (this.expired) this.reset();

		this.remaining--;
		return this;
	}

	/**
	 * Resets the ratelimit to it's full state.
	 * @since 0.0.0-alpha
	 */
	public reset(): Ratelimit {
		return this.resetRemaining().resetTime();
	}

	/**
	 * Resets the ratelimit's remaining uses back to full state.
	 * @since 0.0.0-alpha
	 */
	public resetRemaining(): Ratelimit {
		this.remaining = this.bucket;
		return this;
	}

	/**
	 * Resets this ratelimit's reset time back to full state.
	 * @since 0.0.0-alpha
	 */
	public resetTime(): Ratelimit {
		this.time = Date.now() + this.cooldown;
		return this;
	}
}
