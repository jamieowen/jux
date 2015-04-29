
var HtmlUtils = require( './HtmlUtils' );

var HtmlSprite = function( element )
{
    this.element = element;

    this.element.addedSignal.add( this.onAdded, this );
    this.element.removedSignal.add( this.onRemoved, this );

    this.element.size.changedSignal.add( this.onSizeChanged, this );
    this.element.position.changedSignal.add( this.onPositionChanged, this );

    this.domElement = HtmlUtils.createElement( this );

    this.onSizeChanged();
    this.onPositionChanged();
};


module.exports = HtmlSprite;


HtmlSprite.prototype =
{
    constructor: HtmlSprite,

    onSizeChanged: function()
    {
        this.domElement.style.width  = this.element.size.width + 'px';
        this.domElement.style.height = this.element.size.height + 'px';
    },

    onPositionChanged: function()
    {
        this.domElement.style.left = this.element.position.x + 'px';
        this.domElement.style.top  = this.element.position.y + 'px';
    },

    onAdded: function( parent )
    {
        parent.view.domElement.appendChild( this.domElement );
    },

    onRemoved: function( parent )
    {
        parent.view.domElement.removeChild( this.domElement );
    }
};