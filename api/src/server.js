import http from "http";
import { Server } from "socket.io";

import Vector from '/vector/vector';

import EventBus from '/event/event-bus';
import Engine from '/engine/engine';

import ItemSystem from '/system/item-system';
import PositionSystem from '/system/position-system';
import AngularPositionSystem from '/system/angular-position-system';
import VelocitySystem from '/system/velocity-system';
import AngularVelocitySystem from '/system/angular-velocity-system';
import ForceSystem from '/system/force-system';

import SystemSender from "./async/system-sender";

import Physics from '/physics/physics';
import Collisions from '/collisions/collisions';
import Input from '/input/input';

import Depender from '/depender/depender';

import Item from '/item/item';

import Ball from '/xpong/ball/ball';


const server = http.createServer();
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.listen(4000);


let eventBus = new EventBus();

Depender.registerDependency('eventBus', eventBus);

let engine = new Engine(16, 1);

let itemSystem = new ItemSystem();
let positionSystem = new PositionSystem();
let angularPositionSystem = new AngularPositionSystem();
let velocitySystem = new VelocitySystem();
let angularVelocitySystem = new AngularVelocitySystem();
let forceSystem = new ForceSystem();

let physics = new Physics();
let collisions = new Collisions(physics.getEngine());

Depender.registerDependency('itemSystem', itemSystem);
Depender.registerDependency('positionSystem', positionSystem);
Depender.registerDependency('angularPositionSystem', angularPositionSystem);
Depender.registerDependency('velocitySystem', velocitySystem);
Depender.registerDependency('angularVelocitySystem', angularVelocitySystem);
Depender.registerDependency('forceSystem', forceSystem);
Depender.registerDependency('collisions', collisions);

Ball.register();

let ball = new Item('ball');

eventBus.trigger(
    'add',
    {
        item: ball,
        options: {
            position: new Vector(10, 10),
            velocity: new Vector(.2, .2),
            angularPosition: 0
        }
    }
);

engine.start();

let systemSender = new SystemSender();
systemSender.registerSystem(itemSystem);
systemSender.registerSystem(positionSystem);
systemSender.registerSystem(angularPositionSystem);
systemSender.registerSystem(velocitySystem);
systemSender.registerSystem(angularVelocitySystem);
systemSender.registerSystem(forceSystem);

systemSender.onSend(async (data) => {
    console.log(data)
    io.emit('serverUpdate', data);
});

engine.start();

