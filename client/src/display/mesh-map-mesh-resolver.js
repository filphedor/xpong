export default class MeshMapMesh {
    constructor(meshMap, key) {
        this._meshMap = meshMap;
        this._key = key;
    }

    getMesh() {
        return this._meshMap.getMesh(this._key).clone();
    }
}