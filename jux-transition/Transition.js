
var Tweenr = require( 'tweenr' );
var mapInnerObjects = require( './mapInnerObjects' );

// transition the children in the supplied container.

var Transition = function( container ){

    this.engine    = Tweenr();
    this.container = container;

};


module.exports = Transition;


Transition.prototype = {

    cancel: function(){

        this.engine.cancel();
    },

    /**
     *
     * @param childTo The function to set child properties for this tween
     * @param duration The default duration
     * @param delay The default delay
     * @param ease The default easing equation.
     * @param inView Perform two iterations; one with tweens on children in view, and one without tweens out of view.
     */
    tween: function( childTo, duration, delay, ease, inView ){

        if( !this.container.__children ){
            return;
        }

        if( inView === undefined ){
            inView = true;
        }

        var childrenInView,childrenNotInView;
        if( inView ){
            childrenInView = this.container.getVisibleChildren( true );
            childrenNotInView = childrenInView[1];
            childrenInView = childrenInView[0];
        }else{
            childrenInView = this.container.getVisibleChildren();
        }

        console.log( 'SORT FOR TWEEN : In View :', childrenInView.length, ' Not In View:', childrenNotInView.length );

        var child,childObj,tweenProps,prop,i,j,key;
        var mapped,cEase,cDuration,cDelay;

        var exclude = ['ease','delay','duration'];
        // in view children.
        for( i = 0; i<childrenInView.length; i++ ){

            child = childrenInView[i];

            tweenProps = {};
            childTo(child, i, tweenProps, true);

            cDuration = tweenProps.duration === undefined ? duration : tweenProps.duration;
            cDelay = tweenProps.delay === undefined ? delay : tweenProps.delay;
            cEase = tweenProps.ease === undefined ? ease : tweenProps.ease;

            // returns [ obj,props, obj,props, etc ]
            mapped = mapInnerObjects(tweenProps,child,exclude);

            for (j = 0; j<mapped.length; j+=2) {

                childObj   = mapped[j];
                tweenProps = mapped[j+1];

                tweenProps.duration = cDuration;
                tweenProps.delay    = cDelay;
                tweenProps.ease     = cEase;

                this.engine.to( childObj, tweenProps ).on('update', function( t ){
                    //t.target.x = t._options.x;

                }.bind(this)).on( 'complete', function(){
                    console.log( 'complete : call back' );
                } );
            }
        }

        // not in view - set properties immediately.
        if( childrenNotInView ){

            for( i = 0; i<childrenNotInView.length; i++ ){

                child = childrenNotInView[i];

                tweenProps = {};
                childTo(child, i, tweenProps, false);

                mapped = mapInnerObjects(tweenProps,child,exclude);

                for(j = 0; j<mapped.length; j+=2) {

                    childObj   = mapped[j];
                    tweenProps = mapped[j+1];

                    delete tweenProps.delay;
                    delete tweenProps.duration;
                    delete tweenProps.ease;

                    for( key in tweenProps ){
                        childObj[key] = tweenProps[key];
                    }
                }
            }

        }

    }
};
