import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class PositionEvents {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._positionSystem = Depender.getDependency('positionSystem');

        this._eventBus.listen('tick', new EventListener((e) => {
            const time = e.time

            this._positionSystem.setData(time, this._positionSystem.getData(time - 1));
        }, 100));

        this._eventBus.listen('create', new EventListener((e) => {
            if (e.options.position !== undefined) {
                this._positionSystem.set(e.item, e.time, e.options.position);
            }
        }));
    }
}

export default PositionEvents;