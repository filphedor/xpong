import './game.scss';

import React, { useEffect, useRef } from 'react';

import Vector from '/vector/vector';

import EventBus from '/event/event-bus';
import ClientEngine from '/client-engine/client-engine';

import ItemSystem from '/system/item-system';
import PositionSystem from '/system/position-system';
import AngularPositionSystem from '/system/angular-position-system';
import VelocitySystem from '/system/velocity-system';
import AngularVelocitySystem from '/system/angular-velocity-system';
import ForceSystem from '/system/force-system';

import Physics from '/physics/physics';
import Collisions from '/collisions/collisions';
import Input from '/input/input';

import Display from '/display/display';
import DebugDisplay from '/debug-display/debug-display';
import Depender from '/depender/depender';

import ServerListener from '/async/server-listener';

import Item from '/item/item';

import Ball from '/xpong/ball/ball';
import BallDisplay from '/xpong/ball/ball-display';


function Game() {
    const canvas = useRef(null);

    let debug = false;

    let setUp = async function() {
        let eventBus = new EventBus();

        Depender.registerDependency('eventBus', eventBus);

        let engine = new ClientEngine(16, 1);

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
