"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatelimitManager = void 0;
const discord_js_1 = require("discord.js");
const Ratelimit_1 = require("./Ratelimit");
class RatelimitManager extends discord_js_1.Collection {
    constructor(bucket, cooldown) {
        super();
        Object.defineProperty(this, 'sweepInterval', { value: null, writable: true });
        Object.defineProperty(this, '_bucket', { value: bucket, writable: true });
        Object.defineProperty(this, '_cooldown', { value: cooldown, writable: true });
    }
    get bucket() {
        return this._bucket;
    }
    get cooldown() {
        return this._cooldown;
    }
    acquire(id) {
        return this.get(id) || this.create(id);
    }
    create(id) {
        const ratelimit = new Ratelimit_1.Ratelimit(this._bucket, this._cooldown);
        this.set(id, ratelimit);
        return ratelimit;
    }
    set(id, rateLimit) {
        if (!(rateLimit instanceof Ratelimit_1.Ratelimit))
            throw new TypeError('Invalid RateLimit');
        if (!this.sweepInterval)
            this.sweepInterval = setInterval(this.sweep.bind(this), 30000);
        return super.set(id, rateLimit);
    }
    sweep(fn, thisArg) {
        const amount = super.sweep(fn, thisArg);
        if (this.size === 0) {
            clearInterval(this.sweepInterval);
            this.sweepInterval = null;
        }
        return amount;
    }
}
exports.RatelimitManager = RatelimitManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0ZWxpbWl0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXRpbC9SYXRlbGltaXRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDJDQUF3QztBQUN4QywyQ0FBd0M7QUFJeEMsTUFBYSxnQkFBaUIsU0FBUSx1QkFBNkI7SUFVbEUsWUFBWSxNQUFjLEVBQUUsUUFBZ0I7UUFDM0MsS0FBSyxFQUFFLENBQUM7UUFFUixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBTUQsSUFBVyxNQUFNO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0lBTUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBT00sT0FBTyxDQUFDLEVBQVU7UUFDeEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQU9NLE1BQU0sQ0FBQyxFQUFVO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4QixPQUFPLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBUU0sR0FBRyxDQUFDLEVBQVUsRUFBRSxTQUFvQjtRQUMxQyxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVkscUJBQVMsQ0FBQztZQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFTTyxLQUFLLENBQUMsRUFBa0IsRUFBRSxPQUFZO1FBQzdDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNEO0FBbkZELDRDQW1GQyJ9