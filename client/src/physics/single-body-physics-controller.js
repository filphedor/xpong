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

    let pos = this._positionSystem.getPosition(this._item, time);
    let angPos = this._angularPositionSystem.getAngularPosition(this._item, time);
    let vel = this._velocitySystem.getVelocity(this._item, time);
    let angVel = this._angularVelocitySystem.getAngularVelocity(this._item, time);
    let forces = this._forceSystem.getForces(this._item, time);
    
    console.log(pos)

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

    this._positionSystem.setPosition(this._item, VectorBuilder(pos.x, pos.y), time + 1);
    this._angularPositionSystem.setAngularPosition(this._item, angPos, time + 1);
    this._velocitySystem.setVelocity(this._item, VectorBuilder(vel.x, vel.y), time + 1);
    this._angularVelocitySystem.setAngularVelocity(this._item, angVel, time + 1);
}

export default SingleBodyPhysicsController;