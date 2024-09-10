import Depender from "/shared/depender/depender";
import EventListener from "/shared/event/event-listener";

export default class SystemSender {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._systems = [];
        this._listeners = [];
        this._lastFrameSentTime = 0;
        this._frameGap = 5;

        this._eventBus.listen('tock', new EventListener(async (e) => {
            let time = e.time;

            if (time > this._lastFrameSentTime + this._frameGap) {
                let data = {};

                this._systems.forEach((system) => {
                    data[system.getKey()] = system.getData(time);
                });
    
                this._listeners.forEach((listener) => {
                    listener({
                        'time': time,
                        'data': data
                    });
                });

                this._lastFrameSentTime = time;
            }
        }), 10000);
    }

    registerSystem(system) {
        this._systems.push(system);
    }

    onSend(f) {
        this._listeners.push(f);
    }
}