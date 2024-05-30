import MeshMapItemRenderer from '../../display/mesh-map-item-renderer';


export default class ItizenRenderer extends MeshMapItemRenderer {
    constructor(itizen, positionTransform, quaternion) {
        super(itizen, positionTransform, quaternion, 'itizen');
    }
}