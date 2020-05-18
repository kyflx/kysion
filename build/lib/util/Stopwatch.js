"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
const perf_hooks_1 = require("perf_hooks");
class Stopwatch {
    constructor(digits = 2) {
        this.digits = digits;
        this._start = perf_hooks_1.performance.now();
        this._end = null;
    }
    get duration() {
        return this._end ? this._end - this._start : perf_hooks_1.performance.now() - this._start;
    }
    get running() {
        return Boolean(!this._end);
    }
    restart() {
        this._start = perf_hooks_1.performance.now();
        this._end = null;
        return this;
    }
    reset() {
        this._start = perf_hooks_1.performance.now();
        this._end = this._start;
        return this;
    }
    start() {
        if (!this.running) {
            this._start = perf_hooks_1.performance.now() - this.duration;
            this._end = null;
        }
        return this;
    }
    stop() {
        if (this.running)
            this._end = perf_hooks_1.performance.now();
        return this;
    }
    toString() {
        const time = this.duration;
        if (time >= 1000)
            return `${(time / 1000).toFixed(this.digits)}s`;
        if (time >= 1)
            return `${time.toFixed(this.digits)}ms`;
        return `${(time * 1000).toFixed(this.digits)}μs`;
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcHdhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlsL1N0b3B3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBeUM7QUFLekMsTUFBYSxTQUFTO0lBbUJyQixZQUFZLE1BQU0sR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBTUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDOUUsQ0FBQztJQU1ELElBQVcsT0FBTztRQUNqQixPQUFPLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBTU0sT0FBTztRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVuQixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFNTSxLQUFLO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUxQixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFNTSxLQUFLO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDZjtRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU1NLElBQUk7UUFDUixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyx3QkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU1NLFFBQVE7UUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNCLElBQUksSUFBSSxJQUFJLElBQUk7WUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2hFLElBQUksSUFBSSxJQUFJLENBQUM7WUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUV6RCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2xELENBQUM7Q0FFRDtBQWxHRCw4QkFrR0MifQ==