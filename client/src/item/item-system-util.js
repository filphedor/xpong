const ItemSystemUtil = function(itemSystem) {
    this._itemSystem = itemSystem;
};

ItemSystemUtil.prototype.getItems = function(time) {
    let data = this._itemSystem.getData(time);

    return Object.values(data);
};

export default ItemSystemUtil;