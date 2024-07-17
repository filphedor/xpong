import EventListener from '/event/event-listener';
import System from "./system";

let AngularVelocitySystem = function(eventBus) {
    System.call(this, eventBus);

    let self = this;
    this._eventBus.listen('create', new EventListener(function(e) {
        if (e.angularVelocity !== undefined) {
            self.setAngularVelocity(e.item, e.angularVelocity);
        }
    }));
}

Object.setPrototypeOf(AngularVelocitySystem.prototype, System.prototype);

AngularVelocitySystem.prototype.setAngularVelocity = function(item, angularVelocity) {
    this._data[item.getId()] = angularVelocity;
}

AngularVelocitySystem.prototype.getAngularVelocity = function(item, time) {
    let data = this.getData(time);

    return data[item.getId()];
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