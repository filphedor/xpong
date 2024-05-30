import MeshMapItemRenderer from '../../display/mesh-map-item-renderer';


export default class BuildingWallRenderer extends MeshMapItemRenderer {
    constructor(building, positionTransform, quaternion) {
        super(building, positionTransform, quaternion, 'bricks');
    }
}