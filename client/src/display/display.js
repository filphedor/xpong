import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import EventListener from '/event/event-listener';

import Depender from '/depender/depender';


class Display {
    constructor() {
        this._eventBus = Depender.getDependency('eventBus');
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        this._lastTick = null;

        this._eventBus.listen('tock', new EventListener((e) => {
            this._lastTick = e.time;
        }));
    }

    getCamera() {
        return this._camera;
    }

    start() {
        this._scene.background = new THREE.Color(0x33D1FF);

        this._camera.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3);

        this._camera.position.x = 15;
        this._camera.position.y = -10;
        this._camera.position.z = 10;

        //ground
        const geometry = new THREE.BoxGeometry(500, 500, .01); 
        const material = new THREE.MeshBasicMaterial( {color: 0x111111} ); 
        const cube = new THREE.Mesh(geometry, material);
        this._scene.add(cube);

        const dirLight = new THREE.DirectionalLight(0xF3F8AE, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(0, -100, 100);
        this._scene.add(dirLight);

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 5000;

        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 5000;
        dirLight.shadow.bias = - 0.0001;

        const renderer = new THREE.WebGLRenderer({
            'antialias': true
        });
        renderer.shadowMap.enabled = true;
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(renderer.domElement);

        const composer = new EffectComposer(renderer);

        const renderPass = new RenderPass(this._scene, this._camera);
        composer.addPass(renderPass);

        let self = this;
        let animate = function() {
            requestAnimationFrame(animate);

            self._eventBus.trigger('render', {
                'time': self._lastTick,
                'scene': self._scene
            });

            composer.render();
        };

        animate();
    }
}

export default Display;
