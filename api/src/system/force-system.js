import EventListener from '/event/event-listener';
import System from "./system";

import Vector from '/vector/vector';


let ForceSystem = function() {
    System.call(this);
}

Object.setPrototypeOf(ForceSystem.prototype, System.prototype);

ForceSystem.prototype.addForce = function(item, force, applicationPoint, time) {
    let data = this.getData(time);

    if (!data[item.getId()]) {
        data[item.getId()] = [];
    }

    data[item.getId()].push({
        'force': force,
        'applicationPoint': applicationPoint
    });
}

ForceSystem.prototype.getForces = function(item, time) {
    let data = this.getData(time);

    return data[item.getId()];
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
                'force': new Vector(force.force.getX(), force.force.getY()),
                'applicationPoint': new Vector(force.applicationPoint.getX(), force.applicationPoint.getY())
            });
        })
        
        newData[key] = forces;
    });

    return newData;
};

export default ForceSystem;