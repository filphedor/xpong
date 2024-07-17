//name to be changed lol

let Depender = {
};

Depender._map = {};



Depender.registerDependency = function(key, obj) {
    Depender._map[key] = obj;
};

Depender.getDependency = function(key) {
    return Depender._map[key];
};

export default Depender;