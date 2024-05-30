import Depender from '/depender/depender';

import MeshMapMeshResolver from './mesh-map-mesh-resolver';
import MeshItemRenderer from './mesh-item-renderer';

export default class MeshMapItemRenderer extends MeshItemRenderer {
    constructor(item, positionTransform, quaternion, key) {
        let meshMap = Depender.getDependency('meshMap');
        let meshMapMeshResolver = new MeshMapMeshResolver(meshMap, key);
        
        super(item, positionTransform, quaternion, meshMapMeshResolver)
    }
}