import { Bodies } from 'matter-js';

import SingleBodyPhysicsController from '/physics/single-body-physics-controller';
import BodyResovler from '/physics/body-resolver';

const radius = 2;

class BallBodyResovler extends BodyResovler {
    getBody() {
        return Bodies.circle(0, 0, radius);
    }
}

export default class BallPhysics extends SingleBodyPhysicsController {
    constructor(ball) {
        super(ball, new BallBodyResovler());
    }
}