import Depender from '/shared/depender/depender';
import System from '/shared/system/system';

import AngularPositionEvents from './angular-position-events';


const AngularPosition = function() {
    const system = new System('angularPosition');

    Depender.registerDependency('angularPositionSystem', system);

    AngularPositionEvents();

    const systemSender = Depender.getDependency('systemSender');

    if (systemSender) {
        systemSender.registerSystem(system);
    }
};


export default AngularPosition;