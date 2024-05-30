import EventListener from '/event/event-listener';
import Depender from '/depender/depender';

let System = function() {
    this._eventBus = Depender.getDependency('eventBus');
    this._data = {};
    this._pastData = {};

    let self = this;

    this._eventBus.listen('tock', new EventListener(function(e) {
        self._pastData[e.time] = self.cloneData(self._data);

        if (self._pastData[e.time - 5]) {
            self._pastData[e.time - 5] = null;
        }
    }));
};

System.prototype.getData = function(time) {
    if (!time) {
        return this._data;
    }

    return this._pastData[time];
}

System.prototype.cloneData = function(data) {
    return data;
};

export default System;
