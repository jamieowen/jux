
var Element = require( '../base/Element' );

var Sprite = function()
{
    Element.call( this );

    // image url ?
    // texture url ?
    // canvas url ?
    // spritesheet ?
};


module.exports = Sprite;

Sprite.prototype = Object.create( Element.prototype );
Sprite.prototype.constructor = Sprite;

Sprite.prototype.initialise = function()
{
    console.log( 'initialise sprite' );
    // create the view object.
    this.createView();
};