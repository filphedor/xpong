export default class MeshMap {
    constructor() {
        this._meshMap = {};
    }

    registerMesh(key, mesh) {
        this._meshMap[key]= mesh;
    }

    getMesh(key) {
        return this._meshMap[key];
    }
}