import './game.scss';

import React, { useEffect, useRef } from 'react';

import EventBus from '/event/event-bus';
import ClientEngine from '/client-engine/client-engine';

import System from '/system/system';

import Physics from '/physics/physics';
import Collisions from '/collisions/collisions';
import Input from '/input/input';

import Display from '/display/display';
import DebugDisplay from '/debug-display/debug-display';

import Depender from '/depender/depender';

import ItemEvents from "/item/item-events";

import PositionEvents from "/position/position-events";

import ServerListener from '/async/server-listener';

import Ball from '/xpong/ball/ball';
import BallDisplay from '/xpong/ball/ball-display';


function Game() {
    const canvas = useRef(null);

    let debug = false;

    let setUp = async function() {
        let eventBus = new EventBus();

        Depender.registerDependency('eventBus', eventBus);

        let engine = new ClientEngine(16, 1);

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

        engine.registerSystem(itemSystem);
        engine.registerSystem(positionSystem);
        engine.registerSystem(angularPositionSystem);
        engine.registerSystem(velocitySystem);
        engine.registerSystem(angularVelocitySystem);
        engine.registerSystem(forceSystem);


        let serverListener = new ServerListener(process.env.EVENT_HOST);
        serverListener.connect();

        Ball.register();
        
        let display = null;

        if (debug) {
            display = new DebugDisplay(canvas.current, physics.getEngine(), 1000, 1000);   
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
