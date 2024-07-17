import EventListener from '/event/event-listener';
import System from "./system";

import Vector from '/vector/vector';


let PositionSystem = function() {
    System.call(this);

    let self = this;
    this._eventBus.listen('create', new EventListener(function(e) {
        if (e.position !== undefined) {
            self.setPosition(e.item, e.position);
        }
    }));
}

Object.setPrototypeOf(PositionSystem.prototype, System.prototype);

PositionSystem.prototype.setPosition = function(item, position) {
    this._data[item.getId()] = position;
}

PositionSystem.prototype.getPosition = function(item, time) {
    let data = this.getData(time);

    return data[item.getId()];
}

PositionSystem.prototype.getKey = function() {
    return 'position';
};

PositionSystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = new Vector(data[key].getX(), data[key].getY())
    });

    return newData;
};

export default PositionSystem;