/**
 * Originally created by Dirigeants.
 */

interface ColorsFormatData {
	opening?: number[];
	closing?: number[]
}

interface ColorsFormatOptions {
	style?: string | string[];
	background?: string;
	text?: string;
}

export class Colors {
	/**
	 * Determines if this class should be constructed with colors or not.
	 */
	public static useColors: boolean = null;

	/**
	 * The close codes.
	 */
	public static CLOSE: Record<string, number> = {
		normal: 0,
		bold: 22,
		dim: 22,
		italic: 23,
		underline: 24,
		inverse: 27,
		hidden: 28,
		strikethrough: 29,
		text: 39,
		background: 49
	};

	/**
	 * The style codes.
	 */
	public static STYLES: Record<string, number> = {
		normal: 0,
		bold: 1,
		dim: 2,
		italic: 3,
		underline: 4,
		inverse: 7,
		hidden: 8,
		strikethrough: 9
	};

	/**
	 * The text codes.
	 */
	public static TEXTS: Record<string, number> = {
		black: 30,
		red: 31,
		green: 32,
		yellow: 33,
		blue: 34,
		magenta: 35,
		cyan: 36,
		lightgray: 37,
		lightgrey: 37,
		gray: 90,
		grey: 90,
		lightred: 91,
		lightgreen: 92,
		lightyellow: 93,
		lightblue: 94,
		lightmagenta: 95,
		lightcyan: 96,
		white: 97
	};

	/**
	 * The background codes.
	 */
	public static BACKGROUNDS: Record<string, number> = {
		black: 40,
		red: 41,
		green: 42,
		yellow: 43,
		blue: 44,
		magenta: 45,
		cyan: 46,
		gray: 47,
		grey: 47,
		lightgray: 100,
		lightgrey: 100,
		lightred: 101,
		lightgreen: 102,
		lightyellow: 103,
		lightblue: 104,
		lightmagenta: 105,
		lightcyan: 106,
		white: 107
	};

	/**
	 * The opening tags.
	 */
	public opening: string;
	/**
	 * The closing tags.
	 */
	public closing: string;

	public constructor(options: ColorsFormatOptions = {}) {
		const {opening, closing} = Colors.text(options.text, Colors.background(options.background, Colors.style(options.style)));
		this.opening = Colors.useColors ? `\u001B[${opening.join(';')}m` : "";
		this.closing = Colors.useColors ? `\u001B[${closing.join(';')}m` : "";
	}

	/**
	 * Apply the style.
	 * @param styles - The style or styles to apply.
	 * @param data - The format data.
	 * @since 0.0.0-alpha
	 */
	private static style(styles: string | string[], {opening = [], closing = []}: ColorsFormatData = {}): ColorsFormatData {
		if (styles) {
			if (!Array.isArray(styles)) styles = [styles];
			for (let style of styles) {
				style = style.toLowerCase();
				if (!(style in this.STYLES)) continue;
				opening.push(this.STYLES[style]);
				closing.push(this.CLOSE[style]);
			}
		}
		return {opening, closing};
	}

	/**
	 * Apply the background.
	 * @param background - The background to apply.
	 * @param data - The format data.
	 * @since 0.0.0-alpha
	 */
	private static background(background: string, {opening = [], closing = []}: ColorsFormatData = {}): ColorsFormatData {
		if (background && background.toLowerCase() in this.BACKGROUNDS) {
			opening.push(this.BACKGROUNDS[background.toLowerCase()]);
			closing.push(this.CLOSE.background);
		}
		return {opening, closing};
	}

	/**
	 * Apply the text format.
	 * @param text - The text format to apply.
	 * @param data - The format data.
	 * @since 0.0.0-alpha
	 */
	private static text(text: string, {opening = [], closing = []}: ColorsFormatData = {}): ColorsFormatData {
		if (text && text.toLowerCase() in this.TEXTS) {
			opening.push(this.TEXTS[text.toLowerCase()]);
			opening.push(this.CLOSE.text);
		}

		return {opening, closing}
	}

	/**
	 * Format a string according to the styles passed in the options.
	 * @param str - The string to format.
	 * @since 0.0.0-alpha
	 */
	public format(str: string): string {
		return this.opening + str + this.closing;
	}
}