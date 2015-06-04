
var Attribute       = require( '../attribute' );
//var EventEmitter    = require( 'events' );

// Standard handler.
var DomElementProxy = function( domElement ){

    this.view = domElement;
    this.calculateViewSize();
};


module.exports = DomElementProxy;


DomElementProxy.prototype = {

    calculateViewSize: function(){

        var bounds = this.view.getBoundingClientRect();

        this.size.values[0] = bounds.right - bounds.left;
        this.size.values[1] = bounds.bottom - bounds.top;

        this.size.changed.dispatch();

    },

    update: function(){

        var transform = '';

        if( this.__position ){
            transform += 'translate(' + this.__position.x + 'px, ' + this.__position.y + 'px)';
            //this.view.style.top = this.__position.y + 'px';
            //this.view.style.left = this.__position.x + 'px';
        }
        if( this.__rotation ){
            transform += ' rotate(' + this.__rotation.x + 'deg)';
        }
        if( this.__scale ){
            transform += ' scale(' + this.__scale.x + ', ' + this.__scale.y + ')';
        }

        this.view.style.transform = transform;

        // only adjust the view size explicitly if we have changed internally. ( i.e. not from listening to changes in the view )
        if( this.__size && this.__size.modified ){
            this.view.style.width  = this.__size.width;
            this.view.style.height = this.__size.height;
        }
    },

    getChildren: function(){
        return this.view.childNodes;
    },

    getPointerEvents: function() {

        var obj = {};

        obj.signals = {
            click: new Signal(),
            move: new Signal(),
            up: new Signal(),
            down: new Signal()
        }

        this.view.addEventListener( 'mouse')





    }
};

Object.defineProperties( DomElementProxy.prototype, {

    size: {
        get: function(){
            if( !this.__size ){
                this.__size = new Attribute();
            }
            return this.__size;
        }
    },

    position: {
        get: function(){
            if( !this.__position ){
                this.__position = new Attribute();
            }
            return this.__position;
        }
    },

    rotation: {
        get: function(){
            if( !this.__rotation ){
                this.__rotation = new Attribute();
            }
            return this.__rotation;
        }
    },

    scale: {
        get: function(){
            if( !this.__scale ){
                this.__scale = new Attribute();
            }
            return this.__scale;
        }
    }

} );

