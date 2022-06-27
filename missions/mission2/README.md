# Mission 2

<p aling="center">
    <img  width="350" height="350" src="../../targets/mission2/mission2.png">
</p>

GT-CODE is a project that aims to solve augmented reality exercises inspired by the GTA game.

# Introduction 

Here we will approach mission2 in a more direct way. So I recommend taking a look at mission1 to understand the structure of the project in case you haven't seen it.

**Mission 2: Develop a program that shows a pistol running in augmented reality.**

## Mission 2

```javascript
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

        await mindarThree.start();
        renderer.setAnimationLoop(() => { 
            renderer.render(scene,camera);
        });
    }
    start();
});
```
* As we saw in mission1, you can see that the project structure remains practically the same, we just changed the gltf file from **bike** to **pistol**.

* Now to complete mission 2 we must put a new rotation on the pistol!!

```javascript
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
```
* Soon after anchoring the pistol to the scene object we will create a variable called mixer that will have access to the AnimationMixer function inside THREE.

* Then we pass the variable that we want to add the animation to the scene.

* We create another action variable that receives a method from the mixer variable.

* Finally, we create a clock variable that will store the animation time in delta, then we pass the pistol variable to rotation through `pistol.scene.rotation.set();`.

If you have any questions, please contact me by email pedropapoti@gmail.com.