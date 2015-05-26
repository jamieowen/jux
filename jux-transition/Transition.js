
var Tweenr = require( 'tweenr' );
var TweenChain = require( 'tween-chain' );

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
    tween: function( childTo, duration, delay, ease, inView, callBack ){

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

        var child,childObj,tweenProps,i,j,key;
        var mapped,cEase,cDuration,cDelay;

        var exclude = ['ease','delay','duration'];

        var tweenChain = TweenChain();

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

                tweenChain.chain( childObj, tweenProps );
            }
        }

        this.engine.to( tweenChain ).on( 'complete', function(){

            if( callBack ){
                callBack();
            }
        });

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

    },

    // tween( container, positionFunc, )
    // args
    // split into two functions.
    // positionChild - ( child, idx, tweenProps
    //
    // timeChild - ( visIdx,

    // childIdx ( the index in the container )
    // viewIdx

    // container.getBounds().contains( child.getBounds() );

    // tween( container, childTo,

    // inOut - indicate if the transition is an 'in' transition or 'out' transition
    // - if in, the end positions are calculated first and then checked if they are in view.
    //   if

    // STANDARD TWEEN ( all children regardless )
    // childTo( child, childIdx, tweenProps )

    tweenStandard: function( container, tweenOpts, childTo ){

        var children = container.__children;

        if( !children || !tweenOpts || !childTo ){
            return;
        }

        tweenOpts.duration = tweenOpts.duration === undefined ? 0 : tweenOpts.duration;
        tweenOpts.ease = tweenOpts.ease === undefined ? 'easeInCubic' : tweenOpts.ease;
        tweenOpts.delay = tweenOpts.delay === undefined ? 0 : tweenOpts.delay;

        var i,j;
        var child,mapped,tweenProps,cEase,cDuration,cDelay;
        var ignore = ['ease','delay','duration'];

        var tweenChain = TweenChain();

        for( i = 0; i<children.length; i++ ){

            child = children[i];

            tweenProps = {};
            childTo( child, i, tweenProps );

            cDuration = tweenProps.duration === undefined ? tweenOpts.duration : tweenProps.duration;
            cDelay = tweenProps.delay === undefined ? tweenOpts.delay : tweenProps.delay;
            cEase = tweenProps.ease === undefined ? tweenOpts.ease : tweenProps.ease;

            mapped = mapInnerObjects( tweenProps, child, ignore );

            for( j = 0; j<mapped.length; j+=2 ){

                child   = mapped[j];
                tweenProps = mapped[j+1];

                tweenProps.duration = cDuration;
                tweenProps.delay    = cDelay;
                tweenProps.ease     = cEase;

                tweenChain.chain( child, tweenProps );
            }

        }

        return this.engine.to( tweenChain );
    },


    // childVisible( container, child, childIdx )
    // childTo( child, visIdx, tweenProps )
    tweenVisible: function( container, tweenOpts, childVisible, childTo )
    {
        var children = container.__children;

        if( !children || !tweenOpts || !childTo || !childVisible ){
            return;
        }

        tweenOpts.duration = tweenOpts.duration === undefined ? 0 : tweenOpts.duration;
        tweenOpts.ease = tweenOpts.ease === undefined ? 'easeInCubic' : tweenOpts.ease;
        tweenOpts.delay = tweenOpts.delay === undefined ? 0 : tweenOpts.delay;

        var visible = [];
        var notVisible = [];
        var child;

        for( var i = 0; i<children.length; i++ ){

            child = children[i];
            if( childVisible( container, child, i ) ){
                visible.push( child );
            }else{
                notVisible.push( child );
            }
        }

        // fake a container for both visible and non-visible
        this.tweenStandard( {__children:notVisible}, {delay:0,duration:0,ease:'none'}, childTo )
        return this.tweenStandard( {__children:visible}, tweenOpts, childTo );

    }
};
