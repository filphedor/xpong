import EventListener from '/event/event-listener';
import System from "./system";

let AngularPositionSystem = function() {
    System.call(this);

    this._eventBus.listen('create', new EventListener((e) => {
        if (e.options.angularPosition !== undefined) {
            this.setAngularPosition(e.item, e.options.angularPosition, e.time);
        }
    }));
}

Object.setPrototypeOf(AngularPositionSystem.prototype, System.prototype);

AngularPositionSystem.prototype.setAngularPosition = function(item, position, time) {
    let data = this.getData(time);

    data[item.id] = position;
}

AngularPositionSystem.prototype.getAngularPosition = function(item, time) {
    let data = this.getData(time);

    return data[item.id];
}

AngularPositionSystem.prototype.getKey = function() {
    return 'angular-position';
};

AngularPositionSystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = data[key]
    });

    return newData;
};

export default AngularPositionSystem;