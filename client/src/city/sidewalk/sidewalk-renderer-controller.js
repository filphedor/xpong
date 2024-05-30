import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import SidewalkRenderer from './sidewalk-renderer';

export default class SidewalkRendererController {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._eventBus.listen('create', new EventListener((e) => {
            if (e.item !== undefined && e.item.getType() === 'sidewalk') {
                    new SidewalkRenderer(e.item);
            }
        }));
    }
}