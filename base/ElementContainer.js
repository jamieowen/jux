
// Classes.
var Element             = require( './Element' );

// Functions.
var initialiseRecursive = require( './initialiseRecursive' );

// Constructor
var ElementContainer = function(){

    Element.call( this );
    this.children = [];
};


ElementContainer.prototype = Object.create(Element.prototype);
ElementContainer.prototype.constructor = ElementContainer;
module.exports = ElementContainer;


ElementContainer.prototype.add = function( child ){

    if (!child || this.children.indexOf(child) > -1)
        return;

    if (child.parent)
        child.parent.remove(child);

    this.children.push(child);

    child.__parent = this;

    if(this.__context) {
        initialiseRecursive(this.__context, child, ElementContainer );
    }

    child.signals.added.dispatch(child.__parent);

    return child;
};


ElementContainer.prototype.remove = function( child ){

    var index = this.children.indexOf( child );
    return this.removeAt( index );
};


ElementContainer.prototype.removeAt = function( index ){

    var child = this.children[ index ];
    var p = child.__parent;
    child.__parent = null;

    this.children.splice( index, index+1 );

    child.signals.removed.dispatch( p );

    return child;
};


ElementContainer.prototype.removeAllChildren = function(){

    while( this.children.length ){
        this.removeAt( 0 );
    }

    return null;
};



