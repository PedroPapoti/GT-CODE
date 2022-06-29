import{loadVideo} from '../../libs/loader.js'
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
       const start = async() => { 
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../targets/mission3/mission3.mind',
            uiScanning: "#scanning",
            uiLoading: "no"
        });

        const {renderer, scene, camera} = mindarThree;

        const video = await loadVideo('../../targets/mission3/gtcode-video.mp4');
        const texture  = new THREE.VideoTexture(video);

        const geometry = new THREE.PlaneGeometry(204/480);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const plane = new THREE.Mesh(geometry,material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
            video.play();
        }
        anchor.onTargetLost = () => {
            video.pause();
        }
        
        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene,camera);
        });
     }
     start();
});