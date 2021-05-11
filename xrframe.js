/**
 * D'après la spécification webXR
 * https://www.w3.org/TR/webxr/#xrframe-interface
 */
let XRFrame = function(xrSession,xrDevice) {
    let session = xrSession;
    
    Object.defineProperty(this,"session", {
        get: function() { return session; }
    });

    this.getViewerPose = function(referenceSpace) {
        
    }

    this.getPose = function(space, baseSpace) {
        
    } 

};

export { XRFrame as default};