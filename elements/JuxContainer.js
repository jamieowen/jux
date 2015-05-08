
var Jux = require( '../_rework/Jux' );
var JuxElement = require( '../base/JuxElement' );

var JuxContainer = function() {

    JuxElement.call( this );

    this.__layout = null;
    this.__layoutChanged = false;
};

JuxContainer.prototype = Object.create( JuxElement.prototype );

JuxContainer.prototype.update = function( changed ) {

    // check layout..
    if (this.__layoutChanged) {

        this.__layoutChanged = false;
        changed = true;

        if (this.__layout) {
            this.__layout.apply(this);
        }
    }

    //ElementContainer.prototype.update.call( this, changed );

};

Object.defineProperties( JuxContainer.prototype, {

    layout: {
        get: function(){
            return this.__layout;
        },

        set: function( layout ){

            if( this.__layout === layout ){
                return;
            }

            console.log( 'LAYOUT' );

            this.__layout = layout;
            this.__layoutChanged = true;
            this.invalidate();
        }
    }

});


// no build function for containers.

module.exports = Jux.createComponent( JuxContainer );


