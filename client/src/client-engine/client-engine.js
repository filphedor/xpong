import Depender from "/depender/depender";
import EventListener from '/event/event-listener';


class ClientEngine {
    constructor(delta, speed) {
        this._eventBus = Depender.getDependency('eventBus');
        this._delta = delta;
        this._speed = speed;
        this._time = 0;
        this._incorporatedServerTime = 0;
        this._serverTime = 0;
        this._serverData = null;
        this._running = false;

        this._eventBus.listen('serverUpdate', (data) => {
            this._serverTime = data.time;
            this._serverData = data.data;
        });
    }

    start() {
        this._running = true;

        this.step();
    }

    step() {
        let start = new Date();

        if (this._serverTime > this._incorporatedServerTime) {
            // set data from that time
            //tick tock from that time til equal to current time
        }

        this._eventBus.trigger('tick', {
            'time': this._time,
            'delta': this._delta
        });

        this._eventBus.trigger('tock', {
            'time': this._time,
            'delta': this._delta
        });

        this._eventBus.trigger('frame', {
            'time': this._time
        });

        this._time = this._time + 1;

        let end = new Date();

        let elapsed = end - start;

        let diff = this._delta - elapsed;

        if (this._running) {
            if (diff < 0) {
                console.log('lagging');
            }

            setTimeout(this.step.bind(this), Math.max(diff / this._speed, 1));
        }
    }

    stop() {
        this._running = false;
    }
}


export default ClientEngine;
