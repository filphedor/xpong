import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import BallRenderer from './ball-renderer';


export default {
    "register": function() {
        const eventBus = Depender.getDependency('eventBus');
        const itemSystem = Depender.getDependency('itemSystem');

        const balls = {};

        eventBus.listen('frame', new EventListener((e) => {
            let items = itemSystem.getItems(e.time);

            Object.keys(balls).forEach((key) => {
                balls[key].exists = false;
            });

            let ballIds = Object.keys(balls);

            items.forEach((item) => {
                const id = item.getId();

                if (item.getType() === 'ball' && !ballIds.includes(id)) {
                    console.log('asd')
                    balls[id] = {
                        'exists': true,
                        'renderer': new BallRenderer(item)
                    };
                }
            });
        }, 4000));
    }
};