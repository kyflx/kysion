import { performance } from "perf_hooks";

/**
 * Klasa's Stopwatch class, uses native node to replicate/extend previous performance now dependency.
 */
export class Stopwatch {
  /**
   * The number of digits to appear after the decimal point when returning the friendly duration.
   */
  public digits: number;
  /**
   * The start time of this stopwatch
   */
  private _start: number;
  /**
   * The end time of this stopwatch
   */
  private _end: number;

	/**
	 * Starts a new Stopwatch
	 * @param digits - The number of digits to appear after the decimal point when returning the friendly duration
   * @since 0.0.0-alpha
	 */
	constructor(digits = 2) {
		this.digits = digits;
		this._start = performance.now();
		this._end = null;
	}

	/**
	 * The duration of this stopwatch since start or start to end if this stopwatch has stopped.
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public get duration(): number {
		return this._end ? this._end - this._start : performance.now() - this._start;
	}

	/**
	 * If the stopwatch is running or not
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public get running(): boolean {
		return Boolean(!this._end);
	}

	/**
	 * Restarts the Stopwatch (Returns a running state)
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public restart(): this {
		this._start = performance.now();
    this._end = null;

		return this;
	}

	/**
	 * Resets the Stopwatch to 0 duration (Returns a stopped state)
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public reset(): this {
		this._start = performance.now();
    this._end = this._start;

		return this;
	}

	/**
	 * Starts the Stopwatch
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public start(): this {
		if (!this.running) {
			this._start = performance.now() - this.duration;
			this._end = null;
    }

		return this;
	}

	/**
	 * Stops the Stopwatch, freezing the duration
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public stop(): this {
    if (this.running) this._end = performance.now();

		return this;
	}

	/**
	 * Defines toString behavior
	 * @since 0.0.0-alpha (Klasa 0.4.0)
	 */
	public toString(): string {
		const time = this.duration;
		if (time >= 1000) return `${(time / 1000).toFixed(this.digits)}s`;
    if (time >= 1) return `${time.toFixed(this.digits)}ms`;

		return `${(time * 1000).toFixed(this.digits)}μs`;
	}

}