import Depender from '/shared/depender/depender';
import System from '/shared/system/system';

import VelocityEvents from './velocity-events';


const Velocity = function() {
    const system = new System('velocity');

    Depender.registerDependency('velocitySystem', system);

    VelocityEvents();

    const systemSender = Depender.getDependency('systemSender');

    if (systemSender) {
        systemSender.registerSystem(system);
    }
};


export default Velocity;