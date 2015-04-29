

var Stack = function() {

    // padding..
    // margin..
    // spacing..
    // etc..
};

module.exports = Stack;

Stack.prototype = {

    positions: function( container ) {

        var positions = [];
        var posObj,child;

        for( var i = 0; i<container.children.length; i++ ){

            child = container.children[i];
            posObj = { x:0, y:0, z:0 };

            this.getLayoutForChild( container, child, i, posObj );

            positions.push( posObj );
        }
    },

    getLayoutForChild: function( container, child, i, posObj ){

        posObj.x = ( i * child.size.width ) + ( i * 10 );
        posObj.y = ( container.size.height - child.size.height ) / 2;

    },

    apply: function( container, custom ) {

        var child;
        var i,posObj;

        posObj = {
            x: 0,
            y: 0,
            z: 0
        };

        for( i = 0; i<container.children.length; i++ ) {

            child = container.children[i];

            this.getLayoutForChild( container, child, i, posObj );

            if( custom ){
                custom( i, child, posObj );
            }else{
                child.position.x = posObj.x;
                child.position.y = posObj.y;
            }
        }
    }

};