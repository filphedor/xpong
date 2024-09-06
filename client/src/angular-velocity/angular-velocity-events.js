import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class AngularVelocityEvents {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._angularVelocitySystem = Depender.getDependency('angularVelocitySystem');

        this._eventBus.listen('tick', new EventListener((e) => {
            const time = e.time;

            this._angularVelocitySystem.setData(time, this._angularVelocitySystem.getData(time - 1));
        }, 100));

        this._eventBus.listen('create', new EventListener((e) => {
            if (e.options.angularVelocity !== undefined) {
                this._angularVelocitySystem.set(e.item, e.time, e.options.angularVelocity)
            }
        }));
    }
}

export default AngularVelocityEvents;