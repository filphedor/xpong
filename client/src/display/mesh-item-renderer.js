import * as THREE from 'three';

import Depender from '/shared/depender/depender';
import EventListener from '/shared/event/event-listener';
import VectorBuilder from '/shared/vector/vector-builder';
import VectorUtil from '/shared/vector/vector-util';


export default class MeshItemRenderer {
    constructor(item, positionTransform, quaternion, meshResolver) {
        this._eventBus = Depender.getDependency('eventBus');
        this._positionSystem = Depender.getDependency('positionSystem');
        this._angularPositionSystem = Depender.getDependency('angularPositionSystem');

        this._meshResolver = meshResolver;
        this._mesh = null;
        this._positionTransform = positionTransform;
        this._quaternion = quaternion;

        this._item = item;
    
        this._eventBus.listen('render', new EventListener((e) => {
            this.render(e.time, e.scene);
        }));
    }
    
    render(time, scene) {
        if (!this._mesh) {
            this._mesh = this._meshResolver.getMesh();
            scene.add(this._mesh);
        } else {
            let pos = this._positionSystem.get(this._item, time);
            let angle = this._angularPositionSystem.get(this._item, time);
            let dispX = 0;
            let dispY = 0;
            let dispZ = 0;

            if (this._positionTransform) {
                dispX = this._positionTransform.x;
                dispY = this._positionTransform.y;
                dispZ = this._positionTransform.z;
            }

            let rotatedPosition = VectorUtil.rotate(VectorBuilder(dispX, dispY), VectorBuilder(0, 0), angle);
            let dispPos = VectorUtil.add(pos, rotatedPosition);

            this._mesh.position.set(dispPos.x, dispPos.y, dispZ);

            let q = new THREE.Quaternion();
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);

            if (this._quaternion) {
                q = q.multiply(this._quaternion);
            }
            this._mesh.setRotationFromQuaternion(q);
        }
    }
}