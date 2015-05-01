
var Jux = require( './Jux' );
var JuxNode = require( './JuxNode' );

var JuxContainer = function() {

    JuxNode.call( this );
};

JuxContainer.prototype = Object.create( JuxNode.prototype );

// no build function for containers.

module.exports = Jux.createComponent( JuxContainer );
