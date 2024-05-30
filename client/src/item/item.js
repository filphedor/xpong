import { v4 as uuidv4 } from 'uuid';

let Item = function(type) {
    this._id = uuidv4();
    this._type = type;
};

Item.prototype.getId = function() {
    return this._id;
}

Item.prototype.getType = function() {
    return this._type;
}

export default Item;