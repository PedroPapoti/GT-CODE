import { loadGLTF } from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../targets/mission1/gtcode.mind',
        });

        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const bikeAnchor = mindarThree.addAnchor(0);

        const bike = await loadGLTF('../../models/bike/scene.gltf');
        scene.scale.set(0.1, 0.1, 0.1);
        scene.position.set(0, -0.4, 0);
        bikeAnchor.group.add(bike.scene);

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene,camera);
        });
    }
    start();
});