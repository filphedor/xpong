import Depender from '/depender/depender';
import EventListener from '/event/event-listener';

import Item from '/item/item';
import Vector from '/vector/vector';

import BallPhysics from './ball-physics';


export default {
    "register": function() {
        const eventBus = Depender.getDependency('eventBus');

        eventBus.listen('create', new EventListener((e) => {
            if (e.item !== undefined && e.item.getType() === 'ball') {
                new BallPhysics(e.item);
            }
        }));
    }
};