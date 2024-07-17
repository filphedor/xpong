import EventListener from '/event/event-listener';
import System from "./system";


let ItemSystem = function(eventBus) {
    System.call(this, eventBus);

    this._cache = [];

    this._eventBus.listen('add', new EventListener((e) => {
        this.addItem(e.item, e.options);
    }));

    this._eventBus.listen('tick', new EventListener((e) => {
        const time = e.time;

        this.setData(this.getData(time), time + 1);

        this._cache.forEach((c) => {
            this._eventBus.trigger('create', {
                'time': time + 1,
                'item': c.item,
                'options': c.options
            });
        });

        this._cache = [];
    }, 100));

    this._eventBus.listen('create', new EventListener((e) => {
        this.setItem(e.item, e.time)
    }));
}

Object.setPrototypeOf(ItemSystem.prototype, System.prototype);

ItemSystem.prototype.addItem = function(item, options) {
    this._cache.push({
        'item': item,
        'options': options
    });
};

ItemSystem.prototype.getItems = function(time) {
    let data = this.getData(time);

    return Object.keys(data).map((key) => {
        return data[key];
    });
};

ItemSystem.prototype.setItem = function(item, time) {
    let data = this.getData(time);

    data[item.getId()] = item;
};

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