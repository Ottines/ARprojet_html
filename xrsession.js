import XRRenderState from './xrrenderstate.js'
/**
 * D'après la spécification webXR
 * https://www.w3.org/TR/webxr/#xrsession-interface
 */
 let XRSession = function(device, params) {

    let frameCount = 0;
    let callbacks = [];
    let inputSources= []; //[SameObject] readonly attribute XRInputSourceArray inputSources;
    let visibilityState; //readonly attribute XRVisibilityState visibilityState;
    let compositor = new ARCompositor(device); //Nécessaire pour le fonctionnement du
    let renderState = { //[SameObject] readonly attribute XRRenderState renderState;
        depthNear = 0.1, 
        depthFar = 1000,
        inlineVerticalFieldOfView = null,
        baseLayer = null };


    Object.defineProperty(this,"inputSources", {
        get: function() { return inputSources; }
    });
        
    Object.defineProperty(this,"renderState", {
        get: function() { return renderState; }
    });
    
    Object.defineProperty(this,"visibilityState", {
        get: function() { return visibilityState; }
    });



    this.updateRenderState = function(xrRenderState) {
        this.renderState.depthNear = xrRenderState.depthNear;
        this.renderState.depthFar = xrRenderState.depthFar;
        this.renderState.inlineVerticalFieldOfView = xrRenderState.inlineVerticalFieldOfView; 
        this.renderState.baseLayer = xrRenderState.baseLayer;
    }

    this.requestReferenceSpace = async function(XRReferenceSpaceType) {
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

    this.requestAnimationFrame = function(callback) {
        frameCount++;
        callbacks.push(animationFrameCallback);
        console.log("session requestAnimationFrame", callbacks.length);
        return frameCount;
    }

    this.cancelAnimationFrame = function(handle) {
        window.cancelAnimationFrame(handle);
    }

    this.end = async function() {
    } 

    this.renderFrame = function() {
        let callback = callbacks.shift();
        if (callback !== undefined) {
            console.log('sessionCallback');                
            callback(Date.now() - refTime, new XRFrame(this, device));
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

    // another way of doing it
    let listeners = {};
    this.addEventListener = function (type, callback) {
        if (!(type in listeners)) {
            listeners[type] = []
        }
        listeners[type].push(callback)
    };
    
    this.removeEventListener = function (type, callback) {
        if (!(type in listeners)) {
            return
        }
        const stack = listeners[type]
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1)
            return
        }
    };
    
    this.dispatchEvent = function (event) {
        if (!(event.type in listeners)) {
            return true
        }
        const stack = listeners[event.type].slice()

        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event)
        }
        return !event.defaultPrevented
    };
    
}

};

export { XRSession as default}; 



