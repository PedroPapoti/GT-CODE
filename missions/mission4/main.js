import {CSS3DObject} from '../../libs/three/examples/renderers/CSS3DRenderer.js';
import {loadGLTF, loadTextures, loadVideo} from '../../libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', ()=> {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../targets/mission4/gtcode.mind',
        });

        const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const [
            bombTexture,
            filmTexture,
            laptopTexture,
            rightTexture,
            leftTexture,
            logoTexture,
            mission1Texture,
            mission2Texture,
            mission3Texture,
        ] = await loadTextures([
            '../../targets/mission4/bomb.png',
            '../../targets/mission4/film-projector.png',
            '../../targets/mission4/laptop.png',
            '../../targets/mission4/right.png',
            '../../targets/mission4/left.png',
            '../../targets/mission4/logo1.png',
            '../../targets/mission4/mission1.png',
            '../../targets/mission4/mission2.png',
            '../../targets/mission4/mission3.png',
        ]);

        const planeGeometry = new THREE.PlaneGeometry(1, 0.552);
        const logoMaterial = new THREE.MeshBasicMaterial({map: logoTexture});
        const logo = new THREE.Mesh(planeGeometry,logoMaterial);

        const iconGeometry = new THREE.CircleGeometry(0.075, 32);

        const bombMaterial = new THREE.MeshBasicMaterial({map: bombTexture});
        const filmMaterial = new THREE.MeshBasicMaterial({map: filmTexture});
        const laptopMaterial = new THREE.MeshBasicMaterial({map: laptopTexture});
        const rightMaterial = new THREE.MeshBasicMaterial({map: rightTexture});
        const leftMaterial = new THREE.MeshBasicMaterial({map: leftTexture});
        const bombIcon = new THREE.Mesh(iconGeometry, bombMaterial);
        const filmIcon = new THREE.Mesh(iconGeometry, filmMaterial);
        const laptopIcon = new THREE.Mesh(iconGeometry, laptopMaterial);
        const rightIcon = new THREE.Mesh(iconGeometry, rightMaterial);
        const leftIcon = new THREE.Mesh(iconGeometry, leftMaterial);

        const mission1Video = await loadVideo("../../targets/mission4/gtcode.mp4");
        mission1Video.muted = true;
        const mission1VideoTexture = new THREE.VideoTexture(mission1Video);
        const mission1VideoMaterial = new THREE.MeshBasicMaterial({map:mission1VideoTexture});
        const mission1Material = new THREE.MeshBasicMaterial({map: mission1Texture});
        const mission2Material = new THREE.MeshBasicMaterial({map:mission2Texture});
        const mission3Material = new THREE.MeshBasicMaterial({map: mission3Texture});

        const mission1GtcodeVideo = new THREE.Mesh(planeGeometry, mission1VideoMaterial);
        const mission1Gtcode = new THREE.Mesh(planeGeometry, mission1Material);
        const mission2Gtcode = new THREE.Mesh(planeGeometry, mission2Material);
        const mission3Gtcode = new THREE.Mesh(planeGeometry, mission3Material);

        bombIcon.position.set(-0.42, -0.5, 0);
        laptopIcon.position.set(0.14, -0.5, 0);
        filmIcon.position.set(0.42, -0.5, 0);

        const mission4Group = new THREE.Group();
        mission4Group.position.set(0, 0, -0.01);
        mission4Group.position.set(0, 0.6, -0.01);

        mission4Group.add(mission1Gtcode);
        mission4Group.add(leftIcon);
        mission4Group.add(rightIcon);
        leftIcon.position.set(-0.7, 0, 0);
        rightIcon.position.set(0.7, 0, 0);

        //Colocar BIKE AR.

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(logo);
        anchor.group.add(bombIcon);
        anchor.group.add(laptopIcon);
        anchor.group.add(filmIcon);
        anchor.group.add(mission4Group);

        //CSS object

        const textElement = document.createElement("div");
        const textObj = new CSS3DObject(textElement);
        textObj.position.set(0, -1000, 0);
        textObj.visible = false;
        textElement.style.background = "#FFFFFF";
        textElement.style.padding = " 10px";
        textElement.style.fontSize = "60px";

        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(textObj);

        leftIcon.userData.clickable = true;
        rightIcon.userData.clickable = true;
        bombIcon.userData.clickable = true;
        filmIcon.userData.clickable = true;
        laptopIcon.userData.clickable = true;
        mission1Gtcode.userData.clickable = true;
        mission1GtcodeVideo.userData.clickable = true;

        const missionsGtcode = [mission1Gtcode, mission2Gtcode, mission3Gtcode];
        let currentMissions = 0;

        













    }
});