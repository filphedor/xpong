import { Bodies } from 'matter-js';

import SingleBodyPhysicsController from '/shared/physics/single-body-physics-controller';
import BodyResovler from '/shared/physics/body-resolver';

const radius = 2;

class BallBodyResovler extends BodyResovler {
    getBody() {
        return Bodies.circle(0, 0, radius);
    }
};

export default class BallPhysics extends SingleBodyPhysicsController {
    constructor(ball) {
        super(ball, new BallBodyResovler());
    }
};