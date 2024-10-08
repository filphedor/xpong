import EventListener from '/shared/event/event-listener';
import Depender from '/shared/depender/depender';


let System = function(key) {
    this._key = key;
    this._data = {};

    this._eventBus = Depender.getDependency('eventBus');

    this._eventBus.listen('tock', new EventListener((e) => {
        if (this._data[e.time - 5]) {
            delete this._data[e.time - 5];
        }
    }));
};

System.prototype.get = function(item, time) {
    return this.getData(time)[item.id];
};

System.prototype.set = function(item, time, data) {
    this.getData(time)[item.id] = data;
};

System.prototype.getData = function(time) {
    if (!this._data[time]) {
        this._data[time] = {};
    }
    
    return this._data[time];
};

System.prototype.setData = function(time, data) {
    this._data[time] = data;
}

System.prototype.getKey = function() {
    return this._key;
};

System.prototype.cloneData = function(data) {
    return data;
};

export default System;
