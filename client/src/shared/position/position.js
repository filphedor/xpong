import Depender from '/shared/depender/depender';
import System from '/shared/system/system';

import PositionEvents from './position-events';


const Position = function() {
    const system = new System('position');

    Depender.registerDependency('positionSystem', system);

    PositionEvents();

    const systemSender = Depender.getDependency('systemSender');

    if (systemSender) {
        systemSender.registerSystem(system);
    }
};


export default Position;