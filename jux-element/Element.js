
var Rect = function(){

    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
};

Rect.prototype = {

    contains: function( rect ){
        return (
            rect.left >= this.left &&
            rect.right <= this.right &&
            rect.top >= this.top &&
            rect.bottom <= this.bottom
        );
    }
};

Object.defineProperties( Rect.prototype, {
    width: {
        get: function(){
            return this.right - this.left;
        }
    },

    height: {
        get: function(){
            return this.bottom - this.top;
        }
    }

});

var Element = function( proxy ) {

    if( !proxy ){
        throw new Error( 'A proxy instance needs creating.' );
    }

    this.proxy = proxy;
    this.__children = null; // build when accessed via getter/setter
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
        var bounds = new Rect();

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

    add: function( element )
    {
        // TODO : Sort out more robust event dispatching methods.
        this.children.push( element );
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

            if( !this.__children ){
                this.__children = [];
            }

            return this.__children;
        }
    }

});