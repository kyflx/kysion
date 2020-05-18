export type LoggerAPI = Record<"info" | "warn" | "error" | "debug", (...args: any[]) => any>;

export class KysionLogger implements LoggerAPI {
	debug(...args: any[]): any {};
	error(...args: any[]): any {};
	info(...args: any[]): any {};
	warn(...args: any[]): any {};
}
