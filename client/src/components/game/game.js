import './game.scss';

import React, { useEffect, useRef } from 'react';

import EventBus from '/shared/event/event-bus';
import ClientEngine from '/shared/engine/client-engine';
import ServerListener from '/shared/async/server-listener';

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

import Display from '/display/display';
import DebugDisplay from '/debug-display/debug-display';

import Ball from '/xpong/ball/ball';
import BallDisplay from '/xpong/ball/ball-display';


function Game() {
    const canvas = useRef(null);

    let debug = false;

    let setUp = async function() {
        let eventBus = new EventBus();

        Depender.registerDependency('eventBus', eventBus);

        Async();
        Item();
        Position();
        AngularPosition();
        Velocity();
        AngularVelocity();
        Force();
        Physics();
        Collisions();

        let engine = new ClientEngine(16, 1);

        engine.registerSystem(Depender.getDependency('itemSystem'));
        engine.registerSystem(Depender.getDependency('positionSystem'));
        engine.registerSystem(Depender.getDependency('angularPositionSystem'));
        engine.registerSystem(Depender.getDependency('velocitySystem'));
        engine.registerSystem(Depender.getDependency('angularVelocitySystem'));
        engine.registerSystem(Depender.getDependency('forceSystem'));


        let serverListener = new ServerListener(process.env.EVENT_HOST);
        serverListener.connect();

        Ball.register();
        
        let display = null;

        if (debug) {
            let physicsEngine = Depender.getDependency('physicsEngine')
            display = new DebugDisplay(canvas.current, physicsEngine, 1000, 1000);   
        } else {
            display = new Display();
        }

        BallDisplay.register();

        engine.start();
        display.start();
    };

    useEffect(() => {
        setUp();
    }, [canvas]);

    if (debug) {
        return (
            <canvas ref={canvas}/>
        );
    }

    return (
        <div/>
    );
}

export default Game;
