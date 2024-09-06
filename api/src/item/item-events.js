import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class ItemEvents {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._itemSystem = Depender.getDependency('itemSystem');

        this._cache = [];

        this._eventBus.listen('add', new EventListener((e) => {
            this.addItem(e.item, e.options);
        }));

        this._eventBus.listen('tick', new EventListener((e) => {
            const time = e.time;

            this._itemSystem.setData(time, this._itemSystem.getData(time - 1));
        }, 100));

        this._eventBus.listen('tick', new EventListener((e) => {
            const time = e.time;

            this._cache.forEach((c) => {
                this._eventBus.trigger('create', {
                    'time': time,
                    'item': c.item,
                    'options': c.options
                });
            });

            this._cache = [];
        }, 10000));

        this._eventBus.listen('create', new EventListener((e) => {
            this._itemSystem.set(e.item, e.time, e.item);
        }));
    }

    addItem(item, options) {
        this._cache.push({
            'item': item,
            'options': options
        });
    };
}

export default ItemEvents;