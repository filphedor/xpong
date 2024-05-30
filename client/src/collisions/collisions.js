import EventListener from "../event/event-listener";
import Vector from '/vector/vector';

import Depender from "/depender/depender";


let Collisions = function(engine) {
    this._eventBus = Depender.getDependency('eventBus');
    this._engine = engine;

    this._bodyItemMap = {};

    this._eventBus.listen('postPhysicsEngine', new EventListener(() => {
            this._engine.pairs.list.forEach((pair) => {
                let itemA = this._bodyItemMap[pair.bodyA.id];
                let itemB = this._bodyItemMap[pair.bodyB.id];

                if (itemA && itemB) {
                    this._eventBus.trigger('collision', {
                        'itemA': itemA,
                        'itemB': itemB,
                        'point': new Vector(pair.activeContacts[0].vertex.x,pair.activeContacts[0].vertex.y)
                    });
                }
            });
    }));
};

Collisions.prototype.register = function(body, item) {
    this._bodyItemMap[body.id] = item;
};

Collisions.prototype.deregister = function(body) {
    this._bodyItemMap[body.id] = null;
};

export default Collisions;