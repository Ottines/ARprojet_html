
let XRSystem = function() {

  this.isSessionSupported = async function(sessionMode) {
    if (sessionMode === "immersive-ar" || sessionMode === "inline")
      return true;
    else 
      throw false;
  };


};

let XRSystem = new XRSystem();

navigator.xr.isSessionSupported = XRSystem.isSessionSupported;