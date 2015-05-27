
var Signal = function()
{
    this.listeners = null;
};

module.exports = Signal;

Signal.prototype =
{
    constructor: Signal,
    add: function( handler, scope )
    {
        if( typeof handler !== 'function')
            return;

        var f = false;
        if( this.listeners === null ){
            this.listeners = [];
        }else{
            var idx = this.listeners.length-1;

            while( !f && idx >= 0 ){
                if( this.listeners[idx].handler === handler )
                    f = true;
                idx--;
            }
        }

        if( !f ){
            this.listeners.unshift( { handler: handler, scope: scope } );
        }

    },

    remove: function( handler )
    {
        if( this.listeners === null )
            return;

        var f = false;
        var idx = this.listeners.length-1;

        while( !f && idx >= 0 ){
            if( this.listeners[idx].handler === handler )
                f = true;
            idx--;
        }

        if( f )
            this.listeners.splice( idx+1, 1 );
    },

    removeAll: function()
    {
        if( this.listeners === null )
            return;

        this.listeners.splice( 0 );
    },

    dispatch: function( args )
    {
        if( this.listeners ){

            var i = this.listeners.length-1;
            args = Array.prototype.slice.call( arguments, 0);
            var entry;

            while( i >= 0 ){
                entry = this.listeners[ i ];
                entry.handler.apply( entry.scope || this, args );
                i-=1;
            }
        }
    }

};



