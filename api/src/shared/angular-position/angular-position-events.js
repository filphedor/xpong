import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const AngularPositionEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const angularPositionSystem = Depender.getDependency('angularPositionSystem');

    eventBus.listen('tick', new EventListener((e) => {
        const time = e.time;

        angularPositionSystem.setData(time, angularPositionSystem.getData(time - 1));
    }, 100));

    eventBus.listen('create', new EventListener((e) => {
        if (e.options.angularPosition !== undefined) {
            angularPositionSystem.set(e.item, e.time, e.options.angularPosition)
        }
    }));
};

export default AngularPositionEvents;