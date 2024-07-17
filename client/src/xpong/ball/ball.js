import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import BallPhysics from './ball-physics';


export default {
    "register": function() {
        const eventBus = Depender.getDependency('eventBus');
        const itemSystem = Depender.getDependency('itemSystem');

        const balls = {};

        eventBus.listen('tick', new EventListener((e) => {
            let items = itemSystem.getItems(e.time);

            Object.keys(balls).forEach((key) => {
                balls[key].exists = false;
            });

            let ballIds = Object.keys(balls);

            items.forEach((item) => {
                console.log(item)
                const id = item.getId();

                if (item.getType() === 'ball' && !ballIds.includes(id)) {
                    balls[id] = {
                        'exists': true,
                        'physics': new BallPhysics(item)
                    };
                }
            });
        }, 300));
    }
};