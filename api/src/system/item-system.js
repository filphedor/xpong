import EventListener from '/event/event-listener';
import System from "./system";


let ItemSystem = function(eventBus) {
    System.call(this, eventBus);

    this._eventBus.listen('create', new EventListener((e) => {
        this.addItem(e.item);
    }));
}

Object.setPrototypeOf(ItemSystem.prototype, System.prototype);

ItemSystem.prototype.addItem = function(item) {
    if (!this._data[item.getId()]) {
        this._data[item.getId()] = item.getType();
    }
}

ItemSystem.prototype.getItems = function(time) {
    let data = this.getData(time);

    return Object.keys(data);
}

ItemSystem.prototype.getKey = function() {
    return 'item';
};

ItemSystem.prototype.cloneData = function(data) {
    let newData = {};

    let keys = Object.keys(data);

    keys.forEach((key) => {
        newData[key] = data[key];
    });

    return newData;
};

export default ItemSystem;