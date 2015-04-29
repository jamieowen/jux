/**
 *
 * Creates a css class in javascript.
 * From : http://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
 *
 * @param selector
 * @param style
 *
 */
module.exports = function(selector, style) {

    if(!document.styleSheets) {
        return;
    }

    if(document.getElementsByTagName("head").length == 0) {
        return;
    }

    if( typeof style === 'object' ){
        var props = [];
        var cssProp;
        for( var s in style ){

            cssProp = s.replace( /([A-Z])/g, function( char ){
                return '-' + char.toLowerCase()
            } );

            props.push( cssProp + ':' + style[s].toString() );
        }
        style = props.join( ';' );
    }

    var i;
    var styleSheet;
    var mediaType;
    if(document.styleSheets.length > 0) {
        for( i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].disabled) {
                continue;
            }
            var media = document.styleSheets[i].media;
            mediaType = typeof media;

            if(mediaType == "string") {
                if(media == "" || (media.indexOf("screen") != -1)) {
                    styleSheet = document.styleSheets[i];
                }
            } else if(mediaType == "object") {
                if(media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
                    styleSheet = document.styleSheets[i];
                }
            }

            if( typeof styleSheet != "undefined") {
                break;
            }
        }
    }

    if( typeof styleSheet == "undefined") {
        var styleSheetElement = document.createElement("style");
        styleSheetElement.type = "text/css";

        document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

        for( i = 0; i < document.styleSheets.length; i++) {
            if(document.styleSheets[i].disabled) {
                continue;
            }
            styleSheet = document.styleSheets[i];
        }

        var media = styleSheet.media;
        mediaType = typeof media;
    }

    if(mediaType == "string") {
        for( i = 0; i < styleSheet.rules.length; i++) {
            if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
            }
        }

        styleSheet.addRule(selector, style);
    } else if(mediaType == "object") {
        var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
        for( i = 0; i < styleSheetLength; i++) {
            if(styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
        }

        styleSheet.insertRule(selector + "{" + style + "}", styleSheetLength);
    }
};