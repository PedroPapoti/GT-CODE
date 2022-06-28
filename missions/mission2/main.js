import {loadGLTF} from '../../libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded',() => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../targets/mission2/gtcode.mind',
        });

        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const pistol = await loadGLTF('../../models/pistol/scene.gltf');
        scene.scale.set(0.1, 0.1, 0.1);
        scene.position.set(0, -0.4, 0);

        const pistolAnchor = mindarThree.addAnchor(0);
        pistolAnchor.group.add(pistol.scene);

        const mixer = new  THREE.AnimationMixer(pistol.scene);
        const action = mixer.clipAction(pistol.animations[0]);
        action.play();

        const clock = new THREE.Clock();

        await mindarThree.start();
        renderer.setAnimationLoop(() => { 
            const delta = clock.getDelta();
            pistol.scene.rotation.set(0, pistol.scene.rotation.y + delta, 0);
            mixer.update(delta);
            renderer.render(scene,camera);
        });
    }
    start();
});