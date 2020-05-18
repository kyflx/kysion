"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ratelimit = void 0;
class Ratelimit {
    constructor(bucket, cooldown) {
        this.bucket = bucket;
        this.cooldown = cooldown;
        this.reset();
    }
    get expired() {
        return this.remainingTime === 0;
    }
    get limited() {
        return !(this.remaining > 0 || this.expired);
    }
    get remainingTime() {
        return Math.max(this.time - Date.now(), 0);
    }
    drip() {
        if (this.limited)
            throw new Error("Ratelimited!");
        if (this.expired)
            this.reset();
        this.remaining--;
        return this;
    }
    reset() {
        return this.resetRemaining().resetTime();
    }
    resetRemaining() {
        this.remaining = this.bucket;
        return this;
    }
    resetTime() {
        this.time = Date.now() + this.cooldown;
        return this;
    }
}
exports.Ratelimit = Ratelimit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0ZWxpbWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91dGlsL1JhdGVsaW1pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFhLFNBQVM7SUF1QnJCLFlBQW1CLE1BQWMsRUFBRSxRQUFnQjtRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBTUQsSUFBVyxPQUFPO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQU1ELElBQVcsT0FBTztRQUNqQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQU1ELElBQVcsYUFBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQU1NLElBQUk7UUFDVixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFNTSxLQUFLO1FBQ1gsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQU1NLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU1NLFNBQVM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztDQUNEO0FBMUZELDhCQTBGQyJ9