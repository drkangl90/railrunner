var RAIL_ENGINE = RAIL_ENGINE || (function() {
    var CANVAS = undefined;
    var RENDERER = undefined;
    var CAMERA = undefined;
    var SCENE = undefined;
    
    var draw_frame_rate = 20 // [milliseconds]
    var draw_thread_active = false;
    
    function draw_frame() {
        RENDERER.render(SCENE, CAMERA);
        
        if (draw_thread_active) {
            window.requestAnimationFrame(draw_frame);
        }
    }

    return {
        init : function(canvas_id) {
            if (CANVAS) {
                return false;    
            }
            
            // CREATE THE CANVAS
            CANVAS = document.getElementById(canvas_id);
            CANVAS.width = window.innerWidth;
            CANVAS.height = window.innerHeight;
            
            RENDERER = new THREE.WebGLRenderer({
                antialias : true,
                canvas : CANVAS
            });
            
            // CREATE THE CAMERA
            CAMERA = new THREE.PerspectiveCamera(50, CANVAS.width / CANVAS.height, 0.1, 1000);
            CAMERA.position.set(0, 5, 20);
        },
        generate_scene : function() {
            if (! CANVAS || SCENE) {
                return false;
            }
            
            // CREATE THE SCENE
            SCENE = new THREE.Scene();
            
            SCENE.add(CAMERA);
            
            // Lighting
            var ambientLight = new THREE.AmbientLight(0xffaa33);
            ambientLight.intensity = 1;
            SCENE.add(ambientLight);

            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 500, 0);
            SCENE.add(hemiLight);
            
                        
            // [TEMP] Stand-In Ground
            var ground = new THREE.Mesh(
                new THREE.PlaneGeometry(100, 100),
                new THREE.MeshPhongMaterial({
                    color : 0xdddddd,
                    specular : 0x009900,
                    shininess : 30
                })
            );
            ground.position.set(0, -2.5, 0);
            ground.rotateX(-Math.PI / 2);
            SCENE.add(ground);
        },
        start_draw_thread() {
            if (! SCENE || draw_thread_active) {
                return false;
            }
            
            draw_thread_active = true;
            window.requestAnimationFrame(draw_frame);
        },
        add_drawable : function(threeJsDrawable) {
            if (! SCENE) {
                return false;
            }
            
            SCENE.add(threeJsDrawable);
        }
    };
}());