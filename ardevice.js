let ARDevice = function(deviceConfig) {
    //let canvas = null; 
    //let video = null;
    //let detector = new AR.Detector();
    
    
    Object.defineProperty(this, "started", {
        get: function() { return started; }
    });
    
    //on force l'appareil de l'utilisateur à supporter l'ar
    Object.defineProperty(this,"supportedModes", {
        value : [ 'immersive-ar', 'inline' ],
        writable: false
    });
    
    Object.defineProperty(this,"enabledFeatures", {
        value : [ ],
        writable: false
    }); 
}

