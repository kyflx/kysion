/**
 * Originally created by Dirigeants.
 */

import { Time } from "./Constants";

const { DAY, CRON: { allowedNum, partRegex, wildcardRegex, predefined, tokens, tokensRegex } } = Time;

export class Cron {
	private readonly cron: string;
	private readonly normalized: string;

	private minutes: number[];
	private hours: number[];
	private days: number[];
	private months: number[];
	private dows: number[];

	/**
	 * @since 0.0.0-alpha
	 * @param cron - The cron pattern to use.
	 */
	public constructor(cron: string) {
		this.cron = cron.toLowerCase();
		this.normalized = Cron.normalize(cron);
		[this.minutes, this.hours, this.days, this.months, this.dows] = Cron.parseString(this.normalized);
	}

	/**
	 * Get the next date that matches with the current cron pattern.
	 * @param outset - The date instance to compare with.
	 * @param origin - Whether this next call is origin.
	 * @since 0.0.0-alpha
	 */
	public next(outset = new Date(), origin = true): Date {
		if (!this.days.includes(outset.getUTCDate()) || !this.months.includes(outset.getUTCMonth() + 1) || !this.dows.includes(outset.getUTCDay())) {
			return this.next(new Date(outset.getTime() + DAY), false);
		}
		if (!origin) return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), this.hours[0], this.minutes[0]));

		const now = new Date(outset.getTime() + 60000);
		for (const hour of this.hours) {
			if (hour < now.getUTCHours()) continue;
			for (const minute of  this.minutes) {
				if (hour === now.getUTCHours() && minute < now.getUTCMinutes()) continue;
				return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), hour, minute));
			}
		}

		return this.next(new Date(outset.getTime() + DAY), false);
	}

	/**
	 * Normalize the pattern
	 * @param cron - The pattern to normalize.
	 * @since 0.0.0-alpha
	 */
	private static normalize(cron: string): string {
		if (cron in predefined) return predefined[cron];

		const now = new Date();
		cron.split(" ").map((v, i) => v.replace(wildcardRegex, (match): any => {
			if (match === "h") return Math.floor(Math.random() * (allowedNum[i][1] + 1));
			if (match === "?") {
				switch (i) {
					case 0: return now.getUTCMinutes();
					case 1: return now.getUTCHours();
					case 2: return now.getUTCDate();
					case 3: return now.getUTCMonth();
					case 4: return now.getUTCDay();
				}
			}

			return match;
		})).join(" ");

		return cron.replace(tokensRegex, match => tokens[match]);
	}

	/**
	 * Parse the pattern
	 * @param cron - The cron pattern to parse.
	 * @since 0.0.0-alpha
	 */
	private static parseString(cron: string): number[][] {
		const parts = cron.split(' ');
		if (parts.length !== 5) throw new Error('Invalid Cron Provided');
		return parts.map(Cron.parsePart);
	}

	/**
	 * Parse the current part
	 * @param cronPart - The part of the pattern to parse
	 * @param id - The id that identifies the current part
	 */
	private static parsePart(cronPart: string, id: number): number[] {
		if (cronPart.includes(',')) {
			const res = [];
			for (const part of cronPart.split(',')) res.push(...Cron.parsePart(part, id));
			return [...new Set(res)].sort((a, b) => a - b);
		}

		let [, wild, min, max, step] = partRegex.exec(cronPart);
		if (wild) [min, max] = allowedNum[id];
		else if (!max && !step) return [parseInt(min)];

		// @ts-ignore
		return Cron.range(...[parseInt(min), parseInt(max) || allowedNum[id][1]].sort((a, b) => a - b), parseInt(step) || 1);
	}

	/**
	 * Get an array of numbers with the selected range
	 * @param min - The minimum value.
	 * @param max - The maximum value.`
	 * @param step - The step value.
	 * @since 0.0.0-alpha
	 */
	private static range(min: number, max: number, step: number): number[] {
		return new Array(Math.floor((max - min) / step) + 1).fill(0).map((val, i) => min + (i * step));
	}
}
