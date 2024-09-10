import Depender from '/shared/depender/depender';
import System from '/shared/system/system';

import AngularVelocityEvents from './angular-velocity-events';


const AngularVelocity = function() {
    const system = new System('angularVelocity');

    Depender.registerDependency('angularVelocitySystem', system);

    AngularVelocityEvents();

    const systemSender = Depender.getDependency('systemSender');

    if (systemSender) {
        systemSender.registerSystem(system);
    }
};


export default AngularVelocity;