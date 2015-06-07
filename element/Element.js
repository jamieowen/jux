


/**

 ## jux-element

 Core element class acting as a 'stand-in' between an arbitrary display or scene graph object.
 E.g. A DOM HtmlElement, THREE.Object3D or PIXI.DisplayObjectContainer.

 - Elements all act as child containers, not leaf objects.
 - Instantiates a proxy based on current Jux Factory to the 'real' object.
 - Maps common display/ui properties such as position, scale, rotation & size to a proxy instance.
 - Provides framework for deferred and hierarchical updates of objects.

 @param proxy
 @constructor

 */
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

    /**
     * Update function.
     */
    update: function(){

        this.proxy.update();

        if( this.__children ){
            for( var i = 0; i<this.__children.length; i++ ){
                this.__children[i].update();
            }
        }
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