import EventListener from "/shared/event/event-listener";
import VectorBuilder from '/shared/vector/vector-builder';

import Depender from "/shared/depender/depender";


const CollisionsEvents = function() {
    const eventBus = Depender.getDependency('eventBus');
    const physicsEngine = Depender.getDependency('physicsEngine');

    let bodyItemMap = {};

    eventBus.listen('postPhysicsEngine', new EventListener(() => {
            physicsEngine.pairs.list.forEach((pair) => {
                let itemA = bodyItemMap[pair.bodyA.id];
                let itemB = bodyItemMap[pair.bodyB.id];

                if (itemA && itemB) {
                    eventBus.trigger('collision', {
                        'itemA': itemA,
                        'itemB': itemB,
                        'point': VectorBuilder(pair.activeContacts[0].vertex.x,pair.activeContacts[0].vertex.y)
                    });
                }
            });
    }));
};


export default CollisionsEvents;