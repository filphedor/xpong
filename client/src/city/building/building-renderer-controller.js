import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import BuildingFloorRenderer from './building-floor-renderer';

export default class BuildingRenderer {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._positionSystem = Depender.getDependency('positionSystem');
        this._angularPositionSystem = Depender.getDependency('angularPositionSystem');

        this._eventBus.listen('create', new EventListener((e) => {
            if (e.item !== undefined && e.item.getType() === 'building') {
                let width = e.width;
                let depth = e.depth;
                let floors = e.floors;

                for (let i = 0; i < floors; i++) {
                    new BuildingFloorRenderer(e.item, width, depth, i);
                }
            }
        }));
    }
}