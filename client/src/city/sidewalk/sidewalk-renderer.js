import MeshMapItemRenderer from '../../display/mesh-map-item-renderer';


export default class SidewalkRenderer extends MeshMapItemRenderer {
    constructor(sidewalk, positionTransform, quaternion) {
        super(sidewalk, positionTransform, quaternion, 'sidewalk');
    }
}