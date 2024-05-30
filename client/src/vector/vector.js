class Vector {
    static scalarMult(vectorA, mult) {
        return new Vector(vectorA._x * mult, vectorA._y * mult);
    }

    static scalarDiv(vectorA, div) {
        return new Vector(vectorA._x / div, vectorA._y / div);
    }

    static add(vectorA, vectorB) {
        return new Vector(vectorA._x + vectorB._x, vectorA._y + vectorB._y);
    }

    static subtract(vectorA, vectorB) {
        return new Vector(vectorA._x - vectorB._x, vectorA._y - vectorB._y);
    }

    static rotate(vectorA, vectorB, angle) {
        let temp = Vector.subtract(vectorA, vectorB);

        let rot = new Vector((Math.cos(angle) * temp._x) - (Math.sin(angle) * temp._y), (Math.cos(angle) * temp._y) + (Math.sin(angle) * temp._x));

        return Vector.add(rot, vectorB);
    }

    static tangent(vectorA) {
        return new Vector(vectorA._y * -1, vectorA._x);
    }

    static length(vectorA) {
        return Math.sqrt(Math.pow(vectorA._x, 2) + Math.pow(vectorA._y, 2));
    }

    static identity(vectorA) {
        let length = Vector.length(vectorA);

        return Vector.scalarDiv(vectorA, length);
    }

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }
}

export default Vector;
