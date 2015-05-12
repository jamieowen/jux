
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

    constructor: Element,

    update: function(){

        this.proxy.update();

        if( this.__children ){
            for( var i = 0; i<this.__children.length; i++ ){
                this.__children[i].update();
            }
        }
    },

    getBounds: function( inner )
    {
        var bounds = {
            top:0, left: 0, bottom: 0, right: 0, width: 0, height: 0
        };

        if( inner ){

            var children = this.children;
            var childBounds;

            for( var i = 0; i<children.length; i++ ){

                childBounds = children[i].getBounds();

                bounds.left = Math.min( bounds.left, childBounds.left );
                bounds.top = Math.min( bounds.top, childBounds.top );
                bounds.right = Math.max( bounds.right, childBounds.right );
                bounds.bottom = Math.max( bounds.bottom, childBounds.bottom );

            }

            bounds.width = bounds.right - bounds.left;
            bounds.height = bounds.bottom - bounds.top;

        }else{
            bounds.left = this.position.x;
            bounds.top  = this.position.y;
            bounds.right = bounds.left + this.size.width;
            bounds.bottom = bounds.top + this.size.height;
            bounds.width = this.size.width;
            bounds.height = this.size.height;
        }

        return bounds;
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