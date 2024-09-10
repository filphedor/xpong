import http from "http";
import { Server } from "socket.io";

import Engine from '/shared/engine/engine';
import EventBus from '/shared/event/event-bus';
import Depender from '/shared/depender/depender';

import Async from "/shared/async/async";
import Item from '/shared/item/item';
import Position from '/shared/position/position';
import AngularPosition from '/shared/angular-position/angular-position';
import Velocity from '/shared/velocity/velocity';
import AngularVelocity from '/shared/angular-velocity/angular-velocity';
import Force from '/shared/force/force';
import Physics from '/shared/physics/physics';
import Collisions from '/shared/collisions/collisions';

import ItemBuilder from '/shared/item/item-builder';
import VectorBuilder from '/shared/vector/vector-builder';

import Ball from '/xpong/ball/ball';


let eventBus = new EventBus();

Depender.registerDependency('eventBus', eventBus);

let engine = new Engine(16, 1);

Async();
Item();
Position();
AngularPosition();
Velocity();
AngularVelocity();
Force();
Physics();
Collisions();

Ball.register();

setTimeout(() => {
    let ball = new ItemBuilder('ball');

    eventBus.trigger(
        'add',
        {
            item: ball,
            options: {
                position: VectorBuilder(0, 0),
                velocity: VectorBuilder(.2, .2),
                angularPosition: 0
            }
        }
    );
}, 4000)

engine.start();



const server = http.createServer();
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.listen(4000);

const systemSender = Depender.getDependency('systemSender');

systemSender.onSend(async (data) => {
    io.emit('serverUpdate', data);
});

