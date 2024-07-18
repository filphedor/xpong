import EventListener from '/event/event-listener';
import System from "./system";

import VectorBuilder from '/vector/vector-builder';


let PositionSystem = function() {
    System.call(this);

    this._eventBus.listen('create', new EventListener((e) => {
        if (e.options.position !== undefined) {
            this.setPosition(e.item, e.options.position, e.time);
        }
    }));
}

Object.setPrototypeOf(PositionSystem.prototype, System.prototype);

PositionSystem.prototype.setPosition = function(item, position, time) {
    let data = this.getData(time);

    data[item.id] = position;
}

PositionSystem.prototype.getPosition = function(item, time) {
    let data = this.getData(time);

    return data[item.id];
}

PositionSystem.prototype.getKey = function() {
    return 'position';
};

PositionSystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = VectorBuilder(data[key].x, data[key].y)
    });

    return newData;
};

export default PositionSystem;