
var Jux = require( 'jux-core' );


var Element = function( target ) {

    if( target ){
        this.proxy = Jux.proxy( target );
    }else{
        //this.proxy = Jux.create( this.type );
    }

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

    recalculateProxyViewSizes: function( recursive ){

        if( recursive === undefined ){
            recursive = true;
        }

        this.proxy.calculateViewSize();

        if( recursive && this.__children ){
            for( var i = 0; i<this.__children.length; i++ ){
                this.__children[i].recalculateProxyViewSizes( recursive );
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
        // MAY SCRAP THIS...
    },

    __proxyChildRemoved: function(){
        // MAY SCRAP THIS...
    },

    __proxyResized: function(){
        // MAY SCRAP THIS...
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