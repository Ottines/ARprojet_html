import XRRenderState from './xrrenderstate.js'
/**
 * Auteur : Otti
 * D'après la spécification webXR
 * https://www.w3.org/TR/webxr/#xrsession-interface
 */
class XRSession extends EventTarget {

    //Attribut ??
    //readonly attribute XRVisibilityState visibilityState; ca c'est pas OK
    //[SameObject] readonly attribute XRRenderState renderState; ca c'est OK 
    //[SameObject] readonly attribute XRInputSourceArray inputSources; ca c'est pas OK

    constructor(device, sessionMode) {
        this.sessionMode = sessionMode;
        this.device = device;
        if(sessionMode ==="inline")
        {
            inline = Math.PI*0.5;
        } else inline = null;
        this.renderState= { depthNear = 0.1,
                            depthFar = 1000,
                            inlineVerticalFieldOfView = inline,
                            baseLayer = null };
    }
 
    updateRenderState(xrRenderState){
        this.renderState.depthNear = xrRenderState.depthNear;
        this.renderState.depthFar = xrRenderState.depthFar;
        this.renderState.inlineVerticalFieldOfView = xrRenderState.inlineVerticalFieldOfView; 
        this.renderState.baseLayer = xrRenderState.baseLayer;
    }

    requestReferenceSpace = async function(XRReferenceSpaceType) {
        if(XRReferenceSpaceType === "bounded-floor") {
            var referenceSpace = new XRBoundedReferenceSpace();
            return referenceSpace;
        }
        else if(XRReferenceSpaceType === "viewer" | XRReferenceSpaceType === "local" | XRReferenceSpaceType === "local-floor") {
            var referenceSpace = new XRReferenceSpace();
            return referenceSpace;
        }
        else return false;
    }

    requestAnimationFrame(callback) {

    }

    cancelAnimationFrame(handle) {

    }

    end = async function() {
        
    } 


    
}

