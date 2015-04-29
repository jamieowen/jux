
var Invalidation = function()
{
    this.queue = [];
};

module.exports = Invalidation;

Invalidation.prototype =
{
    invalidate: function( element )
    {
        if( this.queue.indexOf( element ) === -1 )
        {
            console.log( 'invalidate :', element.uid );
            this.queue.push( element );
            return true;
        }else{
            return false
        }
    },

    update: function()
    {
        var i;

        for( i = 0; i<this.queue.length; i++ )
            this.queue[ i ].update();

        this.queue.splice(0);
    }
};


