import XRRenderState from './xrrenderstate.js'
/**
 * Auteur : Otti
 * D'après la spécification webXR
 * https://www.w3.org/TR/webxr/#xrsession-interface
 */
 let XRSession = function(device, params) {

    let frameCount = 0;
    let callbacks = [];
    let inputSources= []; //[SameObject] readonly attribute XRInputSourceArray inputSources;
    let visibilityState; //readonly attribute XRVisibilityState visibilityState;
    let ended = false;
    let sessionMode = params;
    let device = device;
    let redenState = { depthNear = 0.1, //[SameObject] readonly attribute XRRenderState renderState;
        depthFar = 1000,
        inlineVerticalFieldOfView = null,
        baseLayer = null }


    Object.defineProperty(this,"inputSources", {
        get: function() { return inputSources; }
    });
        
    Object.defineProperty(this,"renderState", {
        get: function() { return renderState; }
    });
    
    Object.defineProperty(this,"visibilityState", {
        get: function() { return visibilityState; }
    });

    let updateRenderState = function(xrRenderState) {
        this.renderState.depthNear = xrRenderState.depthNear;
        this.renderState.depthFar = xrRenderState.depthFar;
        this.renderState.inlineVerticalFieldOfView = xrRenderState.inlineVerticalFieldOfView; 
        this.renderState.baseLayer = xrRenderState.baseLayer;
    }

    let requestReferenceSpace = async function(XRReferenceSpaceType) {
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

    let requestAnimationFrame = function(callback) {
        frameCount++;
        callbacks.push(animationFrameCallback);
        console.log("session requestAnimationFrame", callbacks.length);
        return frameCount;
    }

    let cancelAnimationFrame = function(handle) {
        window.cancelAnimationFrame(handle);
    }

    let end = async function() {
    } 

    let renderFrame = function() {
        let callback = callbacks.shift();
        if (callback !== undefined) {
            console.log('sessionCallback');                
            callback(Date.now() - refTime, new XRFrame(this, device)); //Pas encore fait le XRFrame
            if (compositor.isActive()) {
                //compositor.updateVideo();
                compositor.render();
            }
        }
    }

    device.setRenderCallback(renderFrame);




    

    //les events
    let onend;
    let oninputsourceschange;
    let onselect;
    let onselectstart;
    let onselectend;
    let onsqueeze;
    let onsqueezestart;
    let onsqueezeend;
    let onvisibilitychange;
    
}

