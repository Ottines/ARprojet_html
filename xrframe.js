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
        //XRviewPose pas encore fait
    }

    this.getPose = function(space, baseSpace) {
        return xrDevice.getTransform();
    } 

};

export { XRFrame as default};