import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class AngularPositionEvents {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._angularPositionSystem = Depender.getDependency('angularPositionSystem');

        this._eventBus.listen('tick', new EventListener((e) => {
            const time = e.time;

            this._angularPositionSystem.setData(time, this._angularPositionSystem.getData(time - 1));
        }, 100));

        this._eventBus.listen('create', new EventListener((e) => {
            if (e.options.angularPosition !== undefined) {
                this._angularPositionSystem.set(e.item, e.time, e.options.angularPosition)
            }
        }));
    }
}

export default AngularPositionEvents;