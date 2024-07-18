import VectorBuilder from "./vector-builder";


class VectorUtil {
    static scalarMult(vectorA, mult) {
        return VectorBuilder(vectorA.x * mult, vectorA.y * mult);
    }

    static scalarDiv(vectorA, div) {
        return VectorBuilder(vectorA.x / div, vectorA.y / div);
    }

    static add(vectorA, vectorB) {
        return VectorBuilder(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    static subtract(vectorA, vectorB) {
        return VectorBuilder(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    }

    static rotate(vectorA, vectorB, angle) {
        let temp = VectorUtil.subtract(vectorA, vectorB);

        let rot = VectorBuilder((Math.cos(angle) * temp.x) - (Math.sin(angle) * temp.y), (Math.cos(angle) * temp.y) + (Math.sin(angle) * temp.x));

        return VectorUtil.add(rot, vectorB);
    }

    static tangent(vectorA) {
        return VectorBuilder(vectorA.y * -1, vectorA.x);
    }

    static length(vectorA) {
        return Math.sqrt(Math.pow(vectorA.x, 2) + Math.pow(vectorA.y, 2));
    }

    static identity(vectorA) {
        let length = VectorUtil.length(vectorA);

        return VectorUtil.scalarDiv(vectorA, length);
    }
}

export default VectorUtil;
