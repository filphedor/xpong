let EventBus = function() {
    this._eventListeners = {};
};

EventBus.prototype.listen = function(eType, listener) {
    if (!this._eventListeners[eType]) {
        this._eventListeners[eType] = [];
    }

    this._eventListeners[eType].push(listener);
    this._eventListeners[eType].sort((a, b) => {
        return a.priority - b.priority;
    });
};

EventBus.prototype.unlisten = function(eType, listener) {
    if (this._eventListeners[eType]) {
        const index = this._eventListeners[eType].indexOf(listener);
        this._eventListeners[eType].splice(index, 1);
        this._eventListeners[eType].sort((a, b) => {
            return a.priority - b.priority;
        });
    }
};

EventBus.prototype.trigger = function(eType, e) {
    if (this._eventListeners[eType]) {
        for (const listener of this._eventListeners[eType]) {
            listener.f(e);
        }
    }
};

export default EventBus;