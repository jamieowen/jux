
var DomElement = function( view ){

    this.view = view;
    this.needsUpdate = true;

    this._changed   = [ false, false, false, false ];
    this.position   = [];
    this.scale      = [];
    this.rotation   = [];
    this.size       = [];

    this.align      = [];
};


module.exports = DomElement;


DomElement.prototype = {

    update: function(){
        if( this.needsUpdate ){
            this.needsUpdate = false;

            var s = undefined;

            if( this._changed[0] ){
                //'translate(' + this.__position.x + 'px, ' + this.__position.y + 'px)';
                s = 'translate(' this.position[0] + 'px'
            }

            if( s ){
                this.view.style.transform = this.view.style.webkitTransform = s;
            }
        }
    },

    sync: function(){

    }

};

Object.defineProperties( DomElement.prototype, {

    x: {
        get: function(){
            return this.position[0];
        },
        set: function( value ){
            this.position[0] = value;
            this.needsUpdate = true;
        }
    },
    y: {
        get: function(){
            return this.position[1];
        },
        set: function( value ){
            this.position[1] = value;
            this.needsUpdate = true;
        }
    },
    z: {
        get: function () {
            return this.position[2];
        },
        set: function (value) {
            this.position[2] = value;
            this.needsUpdate = true;
        }
    }

});

