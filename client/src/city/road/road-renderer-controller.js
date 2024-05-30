import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import RoadRenderer from './road-renderer';

export default class RoadRendererController {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._eventBus.listen('create', new EventListener((e) => {
            if (e.item !== undefined && e.item.getType() === 'road') {
                    new RoadRenderer(e.item);
            }
        }));
    }
}