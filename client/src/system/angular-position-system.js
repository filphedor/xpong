import EventListener from '/event/event-listener';
import System from "./system";

let AngularPositionSystem = function(eventBus) {
    System.call(this, eventBus);

    let self = this;
    this._eventBus.listen('create', new EventListener(function(e) {
        if (e.angularPosition !== undefined) {
            self.setAngularPosition(e.item, e.angularPosition);
        }
    }));
}

Object.setPrototypeOf(AngularPositionSystem.prototype, System.prototype);

AngularPositionSystem.prototype.setAngularPosition = function(item, position) {
    this._data[item.getId()] = position;
}

AngularPositionSystem.prototype.getAngularPosition = function(item, time) {
    let data = this.getData(time);

    return data[item.getId()];
}

AngularPositionSystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = data[key]
    });

    return newData;
};

export default AngularPositionSystem;