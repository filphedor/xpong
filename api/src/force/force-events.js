import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class ForceEvents {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._forceSystem = Depender.getDependency('forceSystem');

        this._eventBus.listen('create', new EventListener((e) => {
            if (e.options.force !== undefined) {
                this._forceSystem.set(e.item, e.time, e.options.force)
            }
        }));
    }
}

export default ForceEvents;