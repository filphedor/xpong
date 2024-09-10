import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const ItemEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const itemSystem = Depender.getDependency('itemSystem');

    let cache = [];

    const addItem = function(item, options) {
        cache.push({
            'item': item,
            'options': options
        });
    };

    eventBus.listen('add', new EventListener((e) => {
        addItem(e.item, e.options);
    }));

    eventBus.listen('tick', new EventListener((e) => {
        const time = e.time;

        itemSystem.setData(time, itemSystem.getData(time - 1));
    }, 100));

    eventBus.listen('tick', new EventListener((e) => {
        const time = e.time;

        cache.forEach((c) => {
            eventBus.trigger('create', {
                'time': time,
                'item': c.item,
                'options': c.options
            });
        });

        cache = [];
    }, 10000));

    eventBus.listen('create', new EventListener((e) => {
        itemSystem.set(e.item, e.time, e.item);
    }));
};

export default ItemEvents;