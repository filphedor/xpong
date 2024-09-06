import http from "http";
import { Server } from "socket.io";

import VectorBuilder from '/vector/vector-builder';

import EventBus from '/event/event-bus';
import Engine from '/engine/engine';

import System from '/system/system';

import SystemSender from "./async/system-sender";

import Physics from '/physics/physics';
import Collisions from '/collisions/collisions';
import Input from '/input/input';

import Depender from '/depender/depender';

import ItemBuilder from '/item/item-builder';
import ItemEvents from "/item/item-events";

import PositionEvents from "/position/position-events";

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

let itemSystem = new System('item');
let positionSystem = new System('position');
let angularPositionSystem = new System('angularPosition');
let velocitySystem = new System('velocity');
let angularVelocitySystem = new System('angularVelocity');
let forceSystem = new System('force');

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
new ItemEvents();
new PositionEvents();

setTimeout(() => {
    let ball = new ItemBuilder('ball');

    eventBus.trigger(
        'add',
        {
            item: ball,
            options: {
                position: VectorBuilder(10, 10),
                velocity: VectorBuilder(.2, .2),
                angularPosition: 0
            }
        }
    );
}, 4000)

engine.start();

let systemSender = new SystemSender();
systemSender.registerSystem(itemSystem);
systemSender.registerSystem(positionSystem);
systemSender.registerSystem(angularPositionSystem);
systemSender.registerSystem(velocitySystem);
systemSender.registerSystem(angularVelocitySystem);
systemSender.registerSystem(forceSystem);

systemSender.onSend(async (data) => {
    io.emit('serverUpdate', data);
});

engine.start();

