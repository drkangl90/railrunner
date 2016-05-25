﻿function DeathObject() {
    // 3D Transform
    var location = [10, 0, 0];
    var orientation = [0, 0, 0];
    var size = [5, 5, 1];


    var avatar = new THREE.Mesh(
        new THREE.BoxGeometry(size[0], size[1], size[2]),
        new THREE.MeshNormalMaterial(false, 1, false)
    );
    avatar.position.set(location[0], location[1], location[2]);

    return {
        constructor: DeathObject,
        update: function (clock_tick) {

            // shift death object to the left
            if (location[0] > -10) {
                location[0] += 1;
                avatar.position.x = location[0];
            }

            // relocate the death object to the right
            if (location[0] <= -10)
            {
                location[0] = 10;
                avatar.position.x = location[0];
            }
                        
        },
        get_avatar: function () {
            return avatar;
        }
    }
}

var DEATH = DEATH || (function () {
    // Game Components
    var death = undefined;
    var ground = undefined;
    var camera = undefined;

    // Game State
    var alive = true;

    return {
        init: function () {
            death = new DeathObject();
            RAIL_ENGINE.add_death_object(death);
            RAIL_ENGINE.add_drawable_death(death.get_avatar());
        }
    }

}());