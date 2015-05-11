
var Jux = require( 'jux-core' );


var Element = function( target ) {

    if( target ){
        this.proxy = Jux.proxy( target );
    }else{
        //this.proxy = Jux.create( this.type );
    }

    // be notified of resize of this element.
    if( this.proxy.onResize ){
        this.proxy.onResize = this.__proxyResized.bind(this);
    }else{
        console.log( 'Proxy should notify a resize event.' );
    }
    // notify children change.
    //this.proxy.onChildrenChange = null
};


module.exports = Element;


Element.prototype = {

    update: function(){

        this.proxy.update();

        if( this.__children ){
            for( var i = 0; i<this.__children.length; i++ ){
                this.__children[i].update();
            }
        }
    },

    // Sync children with the
    __proxyChildren: function(){

        var pChildren = this.proxy.getChildren();
        for( var i = 0; i<pChildren.length;i++ ){
            this.__children.push( new Element( pChildren[i] ) );
        }
    },

    __proxyChildAdded: function(){
        // should not really happen ?? = should use this Element to add children ?
    },

    __proxyChildRemoved: function(){
        // should not really happen ?? - should use this Element to remove children ?
    },

    __proxyResized: function(){
        return; // notify ?
    }
};

Object.defineProperties( Element.prototype, {

    size: {
        get: function(){
            return this.proxy.size;
        }
    },

    position: {
        get: function(){
            return this.proxy.position;
        }
    },

    rotation: {
        get: function(){
            return this.proxy.rotation;
        }
    },

    scale: {
        get: function(){
            return this.proxy.scale;
        }
    },

    children: {
        get: function(){

            if( this.__children === undefined ){
                this.__children = [];
                this.__proxyChildren();
            }

            return this.__children;
        }
    }

});