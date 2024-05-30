import * as THREE from 'three';

import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import ItizenRenderer from './itizen-renderer';

export default class ItizenRendererController {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._eventBus.listen('create', new EventListener((e) => {
            if (e.item !== undefined && e.item.getType() === 'itizen') {
                    new ItizenRenderer(e.item, new THREE.Vector3(0, 0, 0.6));
            }
        }));
    }
}