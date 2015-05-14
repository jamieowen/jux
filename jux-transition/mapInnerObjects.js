
// map an objects nested values so property object values can use:
// obj.position.x, obj.size.width, etc.

var mapInnerObjects = function( object, mapTo, exclude ){

    var result = [];
    var props = {};
    var propCount = 0;
    var exists;
    exclude = exclude === undefined ? [] : exclude;

    for( var key in object ){

        if( typeof object[key] === 'object' && exclude.indexOf( key ) === -1){

            /**try{
                exists = mapTo[key];
            }catch(error){
                throw new Error( 'Object being mapped to has no property :', key );
            }**/
            if( mapTo[key] !== undefined ){
                result = result.concat( mapInnerObjects( object[key], mapTo[key], exclude ) );
            }

        }else
        if( exclude.indexOf( key ) === -1 ){
            propCount++;
            props[ key ] = object[ key ];
        }
    }

    if( propCount > 0 ){
        return result.concat( [ mapTo, props ] );
    }else{
        return result;
    }

    
};

module.exports = mapInnerObjects;