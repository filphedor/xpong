import Depender from '/shared/depender/depender';
import System from '/shared/system/system';

import ForceEvents from './force-events';


const Force = function() {
    const system = new System('force');

    Depender.registerDependency('forceSystem', system);

    ForceEvents();

    const systemSender = Depender.getDependency('systemSender');

    if (systemSender) {
        systemSender.registerSystem(system);
    }
};


export default Force;