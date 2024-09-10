import Depender from '/shared/depender/depender';
import EventListener from '/shared/event/event-listener';

import BallRenderer from './ball-renderer';
import ItemSystemUtil from '/shared/item/item-system-util';


export default {
    "register": function() {
        const eventBus = Depender.getDependency('eventBus');
        const itemSystem = Depender.getDependency('itemSystem');

        const balls = {};

        eventBus.listen('tock', new EventListener((e) => {
            let items = new ItemSystemUtil(itemSystem).getItems(e.time);


            Object.keys(balls).forEach((key) => {
                balls[key].exists = false;
            });

            let ballIds = Object.keys(balls);

            items.forEach((item) => {
                const id = item.id;

                if (item.type === 'ball' && !ballIds.includes(id)) {
                    balls[id] = {
                        'exists': true,
                        'renderer': new BallRenderer(item)
                    };
                }
            });
        }, 4000));
    }
};