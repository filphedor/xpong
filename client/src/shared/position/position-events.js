import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const PositionEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const positionSystem = Depender.getDependency('positionSystem');

    eventBus.listen('tick', new EventListener((e) => {
        const time = e.time;

        positionSystem.setData(time, positionSystem.getData(time - 1));
    }, 100));

    eventBus.listen('create', new EventListener((e) => {
        if (e.options.position !== undefined) {
            positionSystem.set(e.item, e.time, e.options.position)
        }
    }));
}

export default PositionEvents;