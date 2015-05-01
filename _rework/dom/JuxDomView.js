
// views are essentially proxy objects to an underlying view object.

var DomView = function( juxNode, elementType )
{
    this.juxNode = juxNode;
    this.actualView = document.createElement( elementType );
};

DomView.prototype = {

    addToParent: function( parentView ){
        parent.actualView.appendChild( this.actualView )
    },

    removeFromParent: function(){
        parent.actualView.removeChild( this.actialView );
    },

    render: function(){

    }

};