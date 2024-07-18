import { v4 as uuidv4 } from 'uuid';

let ItemBuilder = function(type) {
    return { 
        id: uuidv4(),
        type: type
    };
};

export default ItemBuilder;