import * as THREE from 'three';

import BuildingWallRenderer from './building-wall-renderer';

export default class BuildingFloorRenderer {
    constructor(building, width, depth, floor) {
        let wallScale = 3;

        //
        for (let i = 0; i < width; i++) {
            let pos = new THREE.Vector3(i * wallScale, -wallScale / 2, floor * wallScale + wallScale / 2);
            let q = new THREE.Quaternion();
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
            
            new BuildingWallRenderer(
                building, 
                pos, 
                q
            );
        }

        for (let i = 0; i < depth; i++) {
            let pos = new THREE.Vector3(-wallScale / 2, (i * wallScale), floor * wallScale + wallScale / 2);
            let q = new THREE.Quaternion();
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), - Math.PI / 2);
            
            new BuildingWallRenderer(
                building, 
                pos, 
                q
            );
        }

        for (let i = 0; i < width; i++) {
            let pos = new THREE.Vector3(i * wallScale, -wallScale / 2 + depth * wallScale, floor * wallScale + wallScale / 2);
            let q = new THREE.Quaternion();
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI);
            
            new BuildingWallRenderer(
                building, 
                pos,
                q
            );
        }

        for (let i = 0; i < depth; i++) {
            let pos = new THREE.Vector3((width * wallScale) - wallScale / 2, (i * wallScale), floor * wallScale + wallScale / 2);
            let q = new THREE.Quaternion();
            q.setFromAxisAngle(new THREE.Vector3(0, 0, 1),  Math.PI / 2);
            
            new BuildingWallRenderer(
                building, 
                pos, 
                q
            );
        }
        

    }
}