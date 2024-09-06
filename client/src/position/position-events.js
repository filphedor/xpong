import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class PositionEvents {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._velocitySystem = Depender.getDependency('velocitySystem');

        this._eventBus.listen('tick', new EventListener((e) => {
            const time = e.time;

            this._velocitySystem.setData(time, this._velocitySystem.getData(time - 1));
        }, 100));

        this._eventBus.listen('create', new EventListener((e) => {
            if (e.options.velocity !== undefined) {
                this._velocitySystem.set(e.item, e.time, e.options.velocity)
            }
        }));
    }

    addItem(item, options) {
        this._cache.push({
            'item': item,
            'options': options
        });
    };
}

export default PositionEvents;