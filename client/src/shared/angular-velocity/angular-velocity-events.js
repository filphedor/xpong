import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const AngularVelocityEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const angularVelocitySystem = Depender.getDependency('angularVelocitySystem');

    eventBus.listen('tick', new EventListener((e) => {
        const time = e.time;

        angularVelocitySystem.setData(time, angularVelocitySystem.getData(time - 1));
    }, 100));

    eventBus.listen('create', new EventListener((e) => {
        if (e.options.angularVelocity !== undefined) {
            angularVelocitySystem.set(e.item, e.time, e.options.angularVelocity)
        }
    }));
}

export default AngularVelocityEvents;