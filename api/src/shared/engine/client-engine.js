import Depender from "/shared/depender/depender";
import EventListener from '/shared/event/event-listener';


class ClientEngine {
    constructor(delta, speed) {
        this._eventBus = Depender.getDependency('eventBus');
        this._delta = delta;
        this._speed = speed;
        this._time = 0;
        this._systems = {};
        this._incorporatedServerTime = 0;
        this._serverTime = 0;
        this._serverData = null;
        this._running = false;

        this._eventBus.listen('serverUpdate', new EventListener((data) => {
            this._serverTime = data.time;
            this._serverData = data.data;
        }));
    }

    registerSystem(system) {
        this._systems[system.getKey()] = system;
    }

    start() {
        this._running = true;

        this.step();
    }

    step() {
        let lead = 2;
        let start = new Date();

        if (this._serverTime > this._incorporatedServerTime) {
            let serverTime = this._serverTime;
            let data = this._serverData;

            let systemKeys = Object.keys(this._systems);

            systemKeys.forEach((key) => {
                this._systems[key].setData(serverTime, data[key]);
            });

            this._time = serverTime;

            this._eventBus.trigger('tock', {
                'time': this._time,
                'delta': this._delta
            });
            
            while (this._time < (serverTime + lead)) {
                this._eventBus.trigger('tick', {
                    'time': this._time + 1,
                    'delta': this._delta
                });

                this._time = this._time + 1;
        
                this._eventBus.trigger('tock', {
                    'time': this._time,
                    'delta': this._delta
                });
            }

            this._incorporatedServerTime = serverTime;
        }

        this._eventBus.trigger('tick', {
            'time': this._time + 1,
            'delta': this._delta
        });

        this._time = this._time + 1;

        this._eventBus.trigger('tock', {
            'time': this._time,
            'delta': this._delta
        });

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
