import { Engine } from 'matter-js';

import Depender from '/shared/depender/depender';

import PhysicsEvents from './physics-events';


const Physics = function() {
    const physicsEngine = Engine.create();
    physicsEngine.gravity.scale = 0.0000;

    Depender.registerDependency('physicsEngine', physicsEngine);

    PhysicsEvents();
};


export default Physics;

