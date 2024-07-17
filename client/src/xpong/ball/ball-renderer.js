import * as THREE from 'three';

import MeshItemRenderer from '/display/mesh-item-renderer';
import MeshResovler from '/display/mesh-resolver';


class BallMeshResolver extends MeshResovler {
    getMesh() {
        const geometry = new THREE.SphereGeometry(2, 32, 16);
        geometry.center();
        const material = new THREE.MeshBasicMaterial({color: 0xffff00});
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }
};

export default class BallRenderer extends MeshItemRenderer {
    constructor(ball) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle( new THREE.Vector3(0, 0, 1), - Math.PI / 2 );

        super(ball, null, quaternion, new BallMeshResolver());
    }
}