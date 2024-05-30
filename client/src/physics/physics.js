import { Engine } from 'matter-js';

import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


let Physics = function() {
    this._eventBus = Depender.getDependency('eventBus');

    this._engine = Engine.create();
    this._engine.gravity.scale = 0.0000;

    this._eventBus.listen('tick', new EventListener((e) => {
        this.step(e.delta);
    }), 4000)
};

Physics.prototype.getEngine = function() {
    return this._engine;
}

Physics.prototype.step = function(delta) {
    this._eventBus.trigger('prePhysicsEngine', {
        'engine': this._engine
    });

    Engine.update(this._engine, delta);

    this._eventBus.trigger('postPhysicsEngine', {
        'engine': this._engine
    });
}

export default Physics;

