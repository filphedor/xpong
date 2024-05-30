import MeshMapItemRenderer from '../../display/mesh-map-item-renderer';


export default class RoadRenderer extends MeshMapItemRenderer {
    constructor(road, positionTransform, quaternion) {
        super(road, positionTransform, quaternion, 'road');
    }
}