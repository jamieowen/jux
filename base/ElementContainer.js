
// Classes.
var Element             = require( './Element' );

// Functions.
var initialiseRecursive = require( './initialiseRecursive' );
var extend              = require( './extend' );

// Constructor
var ElementContainer = function() {

    Element.call( this );

    this.children = [];
};


module.exports = ElementContainer;


ElementContainer.prototype = extend( Element, {

    constructor: ElementContainer,

    add: function( child ){

        if (!child || this.children.indexOf(child) > -1)
            return;

        if (child.parent)
            child.parent.remove(child);

        this.children.push(child);

        child.__parent = this;

        if(this.__context) {
            initialiseRecursive(this.__context, child);
            this.__view.add( child );
        }

        child.signals.added.dispatch(child.__parent);

        return child;
    },


    remove: function( child ) {

        var index = this.children.indexOf( child );
        return this.removeAt( index );
    },


    removeAt: function( index ) {

        var child = this.children[ index ];
        var p = child.__parent;
        child.__parent = null;

        this.children.splice( index, index+1 );

        child.signals.removed.dispatch( p );

        return child;
    },


    removeAllChildren: function() {

        while( this.children.length ){
            this.removeAt( 0 );
        }

        return null;
    }
    
} );



