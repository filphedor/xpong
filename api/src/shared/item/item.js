import Depender from '/shared/depender/depender';
import System from '/shared/system/system';

import ItemEvents from './item-events';


const Item = function() {
    const system = new System('item');

    Depender.registerDependency('itemSystem', system);

    ItemEvents();

    const systemSender = Depender.getDependency('systemSender');

    if (systemSender) {
        systemSender.registerSystem(system);
    }
};


export default Item;