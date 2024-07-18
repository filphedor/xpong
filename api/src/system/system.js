import EventListener from '/event/event-listener';
import Depender from '/depender/depender';


let System = function() {
    this._eventBus = Depender.getDependency('eventBus');
    this._data = {};

    this._eventBus.listen('tock', new EventListener((e) => {
        if (this._data[e.time - 5]) {
            delete this._data[e.time - 5];
        }
    }));
};

System.prototype.getData = function(time) {
    if (!this._data[time]) {
        this._data[time] = {};
    }
    
    return this._data[time];
}

System.prototype.setData = function(data, time) {
    this._data[time] = data;
}

System.prototype.getKey = function() {
    return 'none';
};

System.prototype.cloneData = function(data) {
    return data;
};

export default System;
