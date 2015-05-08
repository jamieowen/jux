
var JuxElement = require( './JuxElement' );
var UpdatePass = require( './UpdatePass' );

var JuxContextNode = function(){

    JuxElement.call(this);

    this.viewFactory = null;
    this.updatePass = new UpdatePass();
};

JuxContextNode.prototype = Object.create( JuxElement.prototype );

JuxContextNode.prototype.update = function(){

    this.updatePass.reset();
    this.updatePass.viewFactory = this.viewFactory;

    this.__build( this.updatePass );
    this.__update();
};

module.exports = JuxContextNode;