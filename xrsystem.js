import ARdevice from './ardevice.js'


let XRSystem = function() {

  this.isSessionSupported = async function(sessionMode) {
    if (sessionMode === "immersive-ar" || sessionMode === "inline")
      return true;
    else 
      return false;
  };

  this.requestSession = async function(sessionMode, sessionInit) {
    if (sessionMode !== "immersive-ar" && sessionMode !== "inline")
        throw false;

    device = new ARDevice();
    
    await device.start();
    
    return new XRSession(device, sessionInit);
};

};

let xrSystem = new XRSystem();

navigator.xr.isSessionSupported = xrSystem.isSessionSupported;
<<<<<<< HEAD
navigator.xr.requestSession = xrSystem.requestSession;
=======
>>>>>>> 26c62c041cb9685f6b24b55544426e479e8f2ba4
