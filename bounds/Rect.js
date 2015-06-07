
var Rect = function(){

    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
};

module.exports = Rect;

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