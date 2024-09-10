import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const ForceEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const forceSystem = Depender.getDependency('forceSystem');

    eventBus.listen('create', new EventListener((e) => {
        if (e.options.forces !== undefined) {
            forceSystem.set(e.item, e.time, e.options.forces)
        }
    }));
}

export default ForceEvents;