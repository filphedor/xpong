import { Bodies, Body, Composite } from 'matter-js';

import Depender from '/depender/depender';
import EventListener from '/event/event-listener';
import Vector from '/vector/vector';


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

    let self = this;

    this._eventBus.listen('prePhysicsEngine', new EventListener(function(e) {
        self.pre(e.engine);
    }));

    this._eventBus.listen('postPhysicsEngine', new EventListener(function(e) {
        self.post(e.engine);
    }));
};

SingleBodyPhysicsController.prototype.pre = function(engine) {
    if (this._body === null) {
        this._body = this._bodyResolver.getBody();
        Composite.add(engine.world, [this._body]);
        this._collisions.register(this._body, this._item);
    }

    this._engine = engine;

    let pos = this._positionSystem.getPosition(this._item);
    let angPos = this._angularPositionSystem.getAngularPosition(this._item);
    let vel = this._velocitySystem.getVelocity(this._item);
    let angVel = this._angularVelocitySystem.getAngularVelocity(this._item);
    let forces = this._forceSystem.getForces(this._item);

    if (pos) {
        Body.setPosition(this._body, {
            'x': pos.getX(),
            'y': pos.getY()
        });
    }

    if (angPos) {
        Body.setAngle(this._body, angPos);
    }

    if (vel) {
        Body.setVelocity(this._body, {
            'x': vel.getX(),
            'y': vel.getY()
        });
    }

    if (angVel) {
        Body.setAngularVelocity(this._body, angVel);
    }

    if (forces) {
        forces.forEach((force) => {
            let applicationPoint = {
                x: force.applicationPoint.getX(),
                y: force.applicationPoint.getY()
            };

            let forceVec = {
                x: force.force.getX(),
                y: force.force.getY()
            };
            Body.applyForce(this._body, applicationPoint, forceVec)
        });
    }
}

SingleBodyPhysicsController.prototype.post = function(engine) {
    let pos = this._body.position;
    let angPos = this._body.angle;
    let vel = this._body.velocity;
    let angVel = this._body.angularVelocity;

    this._positionSystem.setPosition(this._item, new Vector(pos.x, pos.y));
    this._angularPositionSystem.setAngularPosition(this._item, angPos);
    this._velocitySystem.setVelocity(this._item, new Vector(vel.x, vel.y));
    this._angularVelocitySystem.setAngularVelocity(this._item, angVel);
}

export default SingleBodyPhysicsController;