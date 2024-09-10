import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const VelocityEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const velocitySystem = Depender.getDependency('velocitySystem');

    eventBus.listen('tick', new EventListener((e) => {
        const time = e.time

        velocitySystem.setData(time, velocitySystem.getData(time - 1));
    }, 100));

    eventBus.listen('create', new EventListener((e) => {
        if (e.options.velocity !== undefined) {
            velocitySystem.set(e.item, e.time, e.options.velocity);
        }
    }));
}

export default VelocityEvents;