import EventListener from '/event/event-listener';


let Input = function(eventBus) {
    this._eventBus = eventBus;
    this._upEventMap = {};
    this._downEventMap = {};

    this._clearingQueue = false;
    this._eQueue = [];

    this._eventBus.listen('tick', new EventListener(() => {
        this.step();
    }, 2000));

    document.addEventListener('keyup', (e) => {
        e.stopPropagation();

        let ev = this._upEventMap[e.code];
        if (ev && !this._clearingQueue) {
            this._eQueue.push(ev);
        }
    });

    document.addEventListener('keydown', (e) => {
        e.stopPropagation();

        let ev = this._downEventMap[e.code];
        if (ev && !this._clearingQueue) {
            this._eQueue.push(ev)
        }
    });
};

Input.prototype.addUpMap = function(key, e) {
    this._upEventMap[key] = e;
};

Input.prototype.addDownMap = function(key, e) {
    this._downEventMap[key] = e;
};

Input.prototype.step = function() {
    this._clearingQueue = true;

    this._eQueue.forEach((e) => {
        this._eventBus.trigger(e);
    });

    this._eQueue = [];
    this._clearingQueue = false;
};

export default Input;