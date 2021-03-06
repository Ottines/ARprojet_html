import AR from './aruco.js';

let ARDevice = function() {

    let canvas = null; 
    let video = null;
    let detector = new AR.Detector();
    
    Object.defineProperty(this, "started", {
        get: function() { return started; }
    });
    
    
    Object.defineProperty(this,"supportedModes", {
        value : [ 'immersive-ar', 'inline' ],
        writable: false
    });
    
    Object.defineProperty(this,"enabledFeatures", {
        value : [ ],
        writable: false
    });
    
    
    // choses nécessaires pour la configuration :
    var mat2quat = function(m) {
        let qw, qx, qy, qz;
        let m00, m01, m02, m10, m11, m12, m20, m21, m22;
        [m00, m01, m02] = m[0];
        [m10, m11, m12] = m[1];
        [m20, m21, m22] = m[2];
        let tr = m00 + m11 + m22;

        if (tr > 0) { 
            let S = Math.sqrt(tr+1.0) * 2; // S=4*qw 
            qw = 0.25 * S;
            qx = (m21 - m12) / S;
            qy = (m02 - m20) / S; 
            qz = (m10 - m01) / S; 
        } else if ((m00 > m11)&&(m00 > m22)) { 
            let S = Math.sqrt(1.0 + m00 - m11 - m22) * 2; // S=4*qx 
            qw = (m21 - m12) / S;
            qx = 0.25 * S;
            qy = (m01 + m10) / S; 
            qz = (m02 + m20) / S; 
        } else if (m11 > m22) { 
            let S = Math.sqrt(1.0 + m11 - m00 - m22) * 2; // S=4*qy
            qw = (m02 - m20) / S;
            qx = (m01 + m10) / S; 
            qy = 0.25 * S;
            qz = (m12 + m21) / S; 
        } else { 
            let S = Math.sqrt(1.0 + m22 - m00 - m11) * 2; // S=4*qz
            qw = (m10 - m01) / S;
            qx = (m02 + m20) / S;
            qy = (m12 + m21) / S;
            qz = 0.25 * S;
        }
        
        let mag = Math.sqrt(qw*qw + qx*qx + qy*qy + qz*qz);
        return new DOMPointReadOnly(qx / mag, qy / mag, qz / mag, qw / mag);
        
    };     
     
     
    this.start = async function() {
        // creation of video node in order to obtain video stream
        let constraints = { video: { width: 640, height: 520 } };//Modif de la fenetre avec window.innerWidth / window.innerHeight
        video = document.createElement("video");
        canvas = document.createElement("canvas");
        canvas.width = video.width = constraints.video.width;
        canvas.height = video.height = constraints.video.height;
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };

        let shadow = document.body.attachShadow({mode: 'closed'});    
        shadow.appendChild(video);
        shadow.appendChild(canvas);  
    };
    
    
    this.getFrame = function() {
        if (canvas === null)
            return;
        let context = canvas.getContext('2d');
        context.drawImage(video,0,0);
        let markers = detector.detect(context.getImageData(0,0,canvas.width, canvas.height));
        if (markers.length <= 0)
            return ;
        
        let pose = square_pose.pose(markers[0].corners);
        
        let position = new DOMPointReadOnly(pose.position[0],pose.position[1], pose.position[2], 1);
        let orientation = mat2quat(pose.rotation);
        let transform = new XRRigidTransform(position, orientation);
        //
    };
    
    
    this.getImager = function() {
        return canvas;
    };

};

export { ARDevice as default };