import ARDevice from './ardevice.js'


let XRSystem = function() {
  let device;

  //fonction isSessionSupported
  this.isSessionSupported = async function(sessionMode) {
    if (sessionMode === "immersive-ar" || sessionMode === "inline")
      return true;
    else
      return false;
  };
  
  //fonction requestSession
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
navigator.xr.requestSession = xrSystem.requestSession;
