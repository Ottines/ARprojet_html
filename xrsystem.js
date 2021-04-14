import ARDevice from './ardevice.js'


let XRSystem = function() {
  let device;

  this.isSessionSupported = async function(sessionMode) {
    if (sessionMode === "immersive-ar" || sessionMode === "inline")
      return true;
    else
      return false;
  };

  this.requestSession = async function(sessionMode, sessionInit) {
    if (sessionMode !== "immersive-ar" && sessionMode !== "inline")
        throw false;

    //BESOIN DE POSER DES QUESTIONS ICI
    device = new ARDevice();
    
    await device.start();
    
    //return new XRSession(device, sessionInit);
};

};

let xrSystem = new XRSystem();

navigator.xr.isSessionSupported = xrSystem.isSessionSupported;
navigator.xr.requestSession = xrSystem.requestSession;
