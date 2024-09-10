import { Bodies, Body, Composite } from 'matter-js';

let bodyPoints = [
    {
        'x': 0,
        'y': 20
    },
    {
        'x': 60,
        'y': 0
    },
    {
        'x': 0,
        'y': -20
    }
];

export default class BodyResovler {
    getBody() {
        return Bodies.fromVertices(0, 0, bodyPoints);
    }
}