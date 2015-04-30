
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

            case 'HtmlContainer' :
                return new DomHtmlContainer( element );

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


var DomHtmlContainer = function( element ){

    DomContainer.call( this, element );

    // listen to changes in html elements.
    element.signals.domElementAdded.add( this.onDomAdded, this );
    element.signals.domElementRemoved.add( this.onDomRemoved, this );

    // add initial children.
    for( var i = 0; i<element.domElements.length; i++ ){
        this.domElement.appendChild( element.domElements[i] );
    }

    // handle resize events to map back to our model
    this.domElement.addEventListener( 'resize', function( event ){
        console.log( 'DOM RESIZE : ', event );
    });
};

DomHtmlContainer.prototype.onDomAdded = function( domElement ){
    this.domElement.appendChild( domElement );
};

DomHtmlContainer.prototype.onDomRemoved = function( domElement ){
    this.domElement.removeChild( domElement );
};

DomHtmlContainer.prototype = Object.create( DomContainer.prototype );

