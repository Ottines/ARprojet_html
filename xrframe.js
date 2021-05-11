

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