import EventListener from '/event/event-listener';
import System from "./system";

import VectorBuilder from '/vector/vector-builder';


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
    
    data[item.id] = velocity;
}

VelocitySystem.prototype.getVelocity = function(item, time) {
    let data = this.getData(time);

    return data[item.id];
}

VelocitySystem.prototype.getKey = function() {
    return 'velocity';
};

VelocitySystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = VectorBuilder(data[key].x, data[key].y)
    });

    return newData;
};

export default VelocitySystem;