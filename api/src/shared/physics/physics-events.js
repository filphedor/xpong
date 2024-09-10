import { Engine } from 'matter-js';

import EventListener from '/shared/event/event-listener';

import Depender from '/shared/depender/depender';


const PhysicsEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const physicsEngine = Depender.getDependency('physicsEngine');

    const step = function(time, delta) {
        eventBus.trigger('prePhysicsEngine', {
            'time': time
        });

        Engine.update(physicsEngine, delta);

        eventBus.trigger('postPhysicsEngine', {
            'time': time
        });
    };

    eventBus.listen('tick', new EventListener((e) => {
        step(e.time, e.delta);
    }, 5000));
};


export default PhysicsEvents;

