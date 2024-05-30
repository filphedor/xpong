import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

import MeshMap from "./mesh-map";

export default class ApacheMeshMapLoader {
    constructor(rootPath) {
        this._rootPath = rootPath;

        this._pathMap = {};
    }

    registerPath(key, path) {
        this._pathMap[key]= path;
    }
    
    async load() {
        let meshMap = new MeshMap();

        await Promise.all(Object.keys(this._pathMap).map((key) => {
            return new Promise((resolve, reject) => {
                let path = this._rootPath + this._pathMap[key];

                const loader = new GLTFLoader();
                loader.load(path, (gltf) => {
                    meshMap.registerMesh(key, gltf.scene);
                    resolve();
                });
            });
        }));

        return meshMap;
    }
}