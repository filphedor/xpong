import { Bodies, Body, Composite } from 'matter-js';

import Depender from '/depender/depender';
import EventListener from '/event/event-listener';
import VectorBuilder from '/vector/vector-builder';


let SingleBodyPhysicsController = function(item, bodyResolver) {
    this._item = item;
    this._bodyResolver = bodyResolver;

    this._eventBus = Depender.getDependency('eventBus');
    this._positionSystem = Depender.getDependency('positionSystem');
    this._angularPositionSystem = Depender.getDependency('angularPositionSystem');
    this._velocitySystem = Depender.getDependency('velocitySystem');
    this._angularVelocitySystem = Depender.getDependency('angularVelocitySystem');
    this._forceSystem = Depender.getDependency('forceSystem');
    this._collisions = Depender.getDependency('collisions');

    this._body = null;

    this._eventBus.listen('prePhysicsEngine', new EventListener((e) => {
        this.pre(e.engine, e.time);
    }));

    this._eventBus.listen('postPhysicsEngine', new EventListener((e) => {
        this.post(e.engine, e.time);
    }));
};

SingleBodyPhysicsController.prototype.pre = function(engine, time) {
    if (this._body === null) {
        this._body = this._bodyResolver.getBody();
        Composite.add(engine.world, [this._body]);
        this._collisions.register(this._body, this._item);
    }

    this._engine = engine;

    let pos = this._positionSystem.get(this._item, time - 1);
    let angPos = this._angularPositionSystem.get(this._item, time - 1);
    let vel = this._velocitySystem.get(this._item, time - 1);
    let angVel = this._angularVelocitySystem.get(this._item, time - 1);
    let forces = this._forceSystem.get(this._item, time - 1);

    if (pos) {
        Body.setPosition(this._body, {
            'x': pos.x,
            'y': pos.y
        });
    }

    if (angPos) {
        Body.setAngle(this._body, angPos);
    }

    if (vel) {
        Body.setVelocity(this._body, {
            'x': vel.x,
            'y': vel.y
        });
    }

    if (angVel) {
        Body.setAngularVelocity(this._body, angVel);
    }

    if (forces) {
        forces.forEach((force) => {
            let applicationPoint = {
                x: force.applicationPoint.x,
                y: force.applicationPoint.y
            };

            let forceVec = {
                x: force.force.x,
                y: force.force.y
            };

            Body.applyForce(this._body, applicationPoint, forceVec)
        });
    }
}

SingleBodyPhysicsController.prototype.post = function(engine, time) {
    let pos = this._body.position;
    let angPos = this._body.angle;
    let vel = this._body.velocity;
    let angVel = this._body.angularVelocity;

    this._positionSystem.set(this._item, time, VectorBuilder(pos.x, pos.y));
    this._angularPositionSystem.set(this._item, time, angPos);
    this._velocitySystem.set(this._item, time, VectorBuilder(vel.x, vel.y));
    this._angularVelocitySystem.set(this._item, time, angVel);
}

export default SingleBodyPhysicsController;