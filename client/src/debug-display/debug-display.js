import { Render, Bounds } from 'matter-js';


let DebugDisplay = function(canvas, engine, width, height) {
    this._renderer = Render.create({
        'canvas': canvas,
        'engine': engine,
        'bounds': Bounds.create([
            {
                'x': -width / 2,
                'y': -height / 2
            },
            {
                'x': -width / 2,
                'y': height / 2
            },
            {
                'x': width / 2,
                'y': height / 2
            },
            {
                'x': width / 2,
                'y': -height / 2
            }
        ])
    })
};

DebugDisplay.prototype.start = function() {
    Render.run(this._renderer);
};

export default DebugDisplay;