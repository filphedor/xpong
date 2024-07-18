import EventListener from '/event/event-listener';
import System from "./system";

import VectorBuilder from '/vector/vector-builder';


let ForceSystem = function() {
    System.call(this);
}

Object.setPrototypeOf(ForceSystem.prototype, System.prototype);

ForceSystem.prototype.addForce = function(item, force, applicationPoint, time) {
    let data = this.getData(time);

    if (!data[item.id]) {
        data[item.id] = [];
    }

    data[item.id].push({
        'force': force,
        'applicationPoint': applicationPoint
    });
}

ForceSystem.prototype.getForces = function(item, time) {
    let data = this.getData(time);

    return data[item.id];
}

ForceSystem.prototype.getKey = function() {
    return 'force';
};

ForceSystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);
    keys.forEach((key) => {
        let forces = [];

        data[key].forEach((force) => {
            forces.push({
                'force': VectorBuilder(force.force.x, force.force.y),
                'applicationPoint': VectorBuilder(force.applicationPoint.x, force.applicationPoint.y)
            });
        })
        
        newData[key] = forces;
    });

    return newData;
};

export default ForceSystem;