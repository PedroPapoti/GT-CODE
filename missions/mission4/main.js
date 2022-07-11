import {CSS3DObject} from '../../libs/three/examples/renderers/CSS3DRenderer.js';
import {loadGLTF, loadTextures, loadVideo} from '../../libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../targets/mission4/gtcode.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const [
        bombTexture,
        bicepsTexture,
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
        '../../targets/mission4/flexed-biceps.png',
        '../../targets/mission4/film-projector.png',
        '../../targets/mission4/laptop.png',
        '../../targets/mission4/right.png',
        '../../targets/mission4/left.png',
        '../../targets/mission4/logo1.png',
        '../../targets/mission4/mission1-fundo.png',
        '../../targets/mission4/mission2-fundo.png',
        '../../targets/mission4/mission3-fundo.png',
    ]);

    const planeGeometry = new THREE.PlaneGeometry(1, 0.552);
    const logoMaterial = new THREE.MeshBasicMaterial({map: logoTexture});
    const logo = new THREE.Mesh(planeGeometry,logoMaterial);

    const iconGeometry = new THREE.CircleGeometry(0.075, 32);

    const bombMaterial = new THREE.MeshBasicMaterial({map: bombTexture});
    const bicepsMaterial = new THREE.MeshBasicMaterial({map: bicepsTexture});
    const filmMaterial = new THREE.MeshBasicMaterial({map: filmTexture});
    const laptopMaterial = new THREE.MeshBasicMaterial({map: laptopTexture});
    const rightMaterial = new THREE.MeshBasicMaterial({map: rightTexture});
    const leftMaterial = new THREE.MeshBasicMaterial({map: leftTexture});
    const bombIcon = new THREE.Mesh(iconGeometry, bombMaterial);
    const bicepsIcon = new THREE.Mesh(iconGeometry, bicepsMaterial);
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
    bicepsIcon.position.set(-0.14, -0.5, 0);
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

    const bike = await loadGLTF("../../models/bike/scene.gltf");
    bike.scene.scale.set(0.04, 0.04, 0.04);
    bike.scene.position.set(0, -0.25, -0.3);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(bike.scene);
    anchor.group.add(logo);
    anchor.group.add(bombIcon);
    anchor.group.add(bicepsIcon);
    anchor.group.add(laptopIcon);
    anchor.group.add(filmIcon);
    anchor.group.add(mission4Group);

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
    bicepsIcon.userData.clickable = true;
    filmIcon.userData.clickable = true;
    laptopIcon.userData.clickable = true;
    mission1Gtcode.userData.clickable = true;
    mission1GtcodeVideo.userData.clickable = true;

    const missionsGtcode = [mission1Gtcode, mission2Gtcode, mission3Gtcode];
    let currentMissions = 0;
    

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let o = intersects[0].object;   
      while (o.parent && !o.userData.clickable) {
        o = o.parent;
      }
      if (o.userData.clickable) {
        if (o === leftIcon || o === rightIcon) {
          if (o === leftIcon) {
            currentMissions = (currentMissions - 1 + missionsGtcode.length) % missionsGtcode.length;
          } else {
            currentMissions = (currentMissions + 1) % missionsGtcode.length;
          }
          mission1Video.pause();
          for (let i = 0; i < missionsGtcode.length; i++) {
            mission4Group.remove(missionsGtcode[i]);
          }
          mission4Group.add(missionsGtcode[currentMissions]);
        } else if (o === mission1Gtcode) {
          mission4Group.remove(mission1Gtcode);
          mission4Group.add(mission1GtcodeVideo);
          missionsGtcode[0] = mission1GtcodeVideo;
          mission1Video.play();
        } else if (o === mission1GtcodeVideo) {
          if (mission1Video.paused) {
            mission1Video.play();
          } else {
            mission1Video.pause();
          }
            } else if (o === bombIcon ) {
                textObj.visible = true;
                textElement.innerHTML = "Faça como uma bomba!! Exploda e expalhe o projeto com seus amigos!!";
            }else if(o === bicepsIcon) {
                textObj.visible = true;
                textElement.innerHTML = "Vamos exercitar!! Agora faça a sua versão do projeto em AR!!"
            } else if (o === laptopIcon) {
                textObj.visible = true;
                textElement.innerHTML = "Faça um fork do projeto em https://github.com/PedroPapoti";
            } else if (o === filmIcon) { 
                textObj.visible = true;
                textElement.innerHTML = "Aprenda mais sobre os bastidores do projeto pelo meu isnta!!"
            }
         }
      }
   });

    const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const iconScale = 1 + 0.2 * Math.sin(elapsed*5);
      [bombIcon, bicepsIcon, laptopIcon, filmIcon].forEach((icon) => {
	    icon.scale.set(iconScale, iconScale, iconScale);
      });

      const bakeAr = Math.min(0.3, -0.3 + elapsed * 0.5);
      bike.scene.position.set(0, -0.25, bakeAr);
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);

    });
  }
  start();
});