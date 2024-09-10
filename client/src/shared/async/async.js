import Depender from '/shared/depender/depender';

import SystemSender from "./system-sender";


const Async = function() {
    let systemSender = new SystemSender();

    Depender.registerDependency('systemSender', systemSender);
};


export default Async;