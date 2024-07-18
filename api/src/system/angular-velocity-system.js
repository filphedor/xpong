import EventListener from '/event/event-listener';
import System from "./system";

let AngularVelocitySystem = function() {
    System.call(this);

    this._eventBus.listen('create', new EventListener((e) => {
        if (e.options.angularVelocity !== undefined) {
            this.setAngularVelocity(e.item, e.options.angularVelocity, e.time);
        }
    }));
}

Object.setPrototypeOf(AngularVelocitySystem.prototype, System.prototype);

AngularVelocitySystem.prototype.setAngularVelocity = function(item, angularVelocity, time) {
    let data = this.getData(time);

    data[item.id] = angularVelocity;
}

AngularVelocitySystem.prototype.getAngularVelocity = function(item, time) {
    let data = this.getData(time);

    return data[item.id];
}

AngularVelocitySystem.prototype.getKey = function() {
    return 'angular-velocity';
};

AngularVelocitySystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = data[key]
    });

    return newData;
};

export default AngularVelocitySystem;