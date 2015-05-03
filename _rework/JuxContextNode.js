
var JuxNode = require( './JuxNode' );

var JuxContextNode = function(){
    JuxNode.call(this);
};

JuxContextNode.prototype = Object.create( JuxNode.prototype );

JuxContextNode.prototype.update = function(){

    this.__build();
    this.__update();
};

module.exports = JuxContextNode;