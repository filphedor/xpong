import EventListener from '/event/event-listener';
import System from "./system";

import Vector from '/vector/vector';


let VelocitySystem = function() {
    System.call(this);

    this._eventBus.listen('create', new EventListener((e) => {
        if (e.options.velocity !== undefined) {
            this.setVelocity(e.item, e.options.velocity, e.time);
        }
    }));
}

Object.setPrototypeOf(VelocitySystem.prototype, System.prototype);

VelocitySystem.prototype.setVelocity = function(item, velocity, time) {
    let data = this.getData(time);
    
    data[item.getId()] = velocity;
}

VelocitySystem.prototype.getVelocity = function(item, time) {
    let data = this.getData(time);

    return data[item.getId()];
}

VelocitySystem.prototype.getKey = function() {
    return 'velocity';
};

VelocitySystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = new Vector(data[key].getX(), data[key].getY())
    });

    return newData;
};

export default VelocitySystem;