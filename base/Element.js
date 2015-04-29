
var Prop3   = require( '../core/Prop3' );
var Signal  = require( '../core/Signal');

var generateUID = require( './generateUID' );


var Element = function()
{
    this.uid             = generateUID();

    this.__view          = null;
    this.__parent        = null;

    this.__inited        = false;
    this.__invalid       = false;

    this.position        = new Prop3();
    this.size            = new Prop3();
    this.scale           = new Prop3();
    this.rotation        = new Prop3();

    this.signals = {
        added: new Signal(),
        removed: new Signal(),
        updated: new Signal()
    };

    this.position.changedSignal.add( this.onPositioned, this );
    this.size.changedSignal.add( this.onSized, this );
};


module.exports = Element;


Element.prototype = {

    constructor: Element,

    initialise: function(){

    },

    update: function( changed ){

        var p = this.__parent;
        var propagate = false;

        if( this.position.hasChanged || changed ){
            this.position.hasChanged = false;
            changed = true;

            if( p ){
                this.position.update( p.size.width, p.size.height, p.size.depth );
            }
        }

        if( this.size.hasChanged || changed ){
            this.size.hasChanged = false;
            changed = true;
            propagate = true;

            if( p ){
                this.size.update( p.size.width, p.size.height, p.size.depth );
            }
        }

        if( this.rotation.hasChanged ){
            this.rotation.hasChanged = false;
            changed = true;
            // don't call update on rotation - this is only for percentages. TODO : may be just call anyway?
        }

        if( this.scale.hasChanged ){
            this.scale.hasChanged = false;
            changed = true;
            // don't call update on scale - this is only for percentages. TODO : may be just call anyway?
        }

        if( changed ){
            this.signals.updated.dispatch();
        }

        var child;
        for( var i = 0; i<this.children.length; i++ ) {
            child = this.children[i];
            child.update( propagate );
        }
    },

    invalidate: function() {
        if( this.__invalid ){
            return;
        }

        //var context = this.context;

        //if( context ){
        //  this.__invalid = true;
        //  context.invalidation.invalidate( this );
        //}
    },


    onPositioned: function()
    {
        this.invalidate();
    },

    onSized: function()
    {
        this.invalidate();
    }
};


Object.defineProperties( Element.prototype, {

    view:{
        get:function(){
            return this.__view;
        },

        set:function(){
            throw new Error( 'Cannot set a view object directly!' );
        }
    },

    parent: {
        get: function(){
            return this.__parent;
        },

        set: function(){
            throw new Error( 'Cannot set parent directly!' );
        }
    },

    context: {
        get: function(){
            if( !this.__context ){
                throw new Error( 'No context set.' );
            }
        },

        set: function(){
            throw new Error( 'Cannot set context directly!' );
        }
    }

});
