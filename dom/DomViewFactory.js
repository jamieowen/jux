
var createCssClass = require( './createCssClass' );

var DomViewFactory = function() {

};

DomViewFactory.prototype = {

    constructor: DomViewFactory,

    createView: function( element ){

        var cls = element.viewClass;

        switch( cls ){

            case 'Container' :
                return new DomContainer( element );

            case 'Sprite' :
                return null;

            case 'Image' :
                return null;

            case 'Graphic' :
                return null;

            default:
                throw new Error( 'No view class available for this element.' );

        }

    }

};

module.exports = DomViewFactory;


createCssClass( '.container', {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
    margin: '0px',
    padding: '0px',
    //opacity: '0.35',
    backgroundColor: 'rgba( 0, 0, 0, 0.2 );'
});

var DomContainer = function( element ){

    this.element = element;
    this.element.signals.added.add( this.onAdded, this );
    this.element.signals.removed.add( this.onRemoved, this );
    this.element.signals.updated.add( this.onUpdated, this );

    this.uidClass = '_' + this.element.uid;

    if( element.domElement ){ // TODO : Look into the process of this.
        this.domElement = element.domElement;
    }else{
        this.domElement = document.createElement( 'div' );
    }

    this.domElement.className = 'container ' + this.uidClass;
};

DomContainer.prototype = {

    constructor: DomContainer,

    onAdded: function( parent ){
        parent.__view.domElement.appendChild( this.domElement );
    },

    onRemoved: function( parent ){
        parent.__view.domElement.removeChild( this.domElement );
    },

    removeAt: function( index ){
        // TODO..
    },

    onUpdated: function(){

        var size = this.element.size;
        var position = this.element.position;

        createCssClass( '.' + this.uidClass, {
            width: size.width + 'px',
            height: size.height + 'px',
            transform: 'translate(' + position.x + 'px,' + position.y + 'px);'
        })

    }

};
