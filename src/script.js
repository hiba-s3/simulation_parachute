import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { Parachute1, Person } from "./h";
import { Parachute2 } from "./h";
import { Parachute3 } from "./h";
import { Parachute4 } from "./h";
import { Parachute5 } from "./h";
import { Parachute6 } from "./h";
import { Parachute7 } from "./h";
import { Parachute8 } from "./h";
import { Parachute9 } from "./h";
import { Airplane } from './h';
import { Person1 } from './h';
/**
 * parachute
 */

/**
 * loaders
 */
const LoadingBar = document.querySelector('.loading_bar')
const loadingmanager = new THREE.LoadingManager(
   //loaded
   () => {
    gsap.delayedCall(0.5, () => {
        gsap.to(overlay.material.uniforms.uAlpha, { duration: 3, value: 0 });
        LoadingBar.classList.add("ended");
        LoadingBar.style.transform = "";
    });
  },
     //progress
     (itemUrl , itemsLoaded , itemsTotal) => {
       
        const progressRatio = itemsLoaded / itemsTotal
        LoadingBar.style.transform= "scaleX(" + progressRatio  + ")";
    }   
)
const gltfloader = new GLTFLoader(loadingmanager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingmanager);
// Debug
const gui = new dat.GUI();
// Canvas
const canvas = document.querySelector('canvas.webgl');
// Scene
const scene = new THREE.Scene();
//parameters for the airplane
const parameters1 = {
    movX: 0,
    movY: 0,
    movZ: 0
};
//parameters for the man and the parachute movment
const parameters = {
    movX: 0,
    movY: 0,
    movZ: 0
};
//parameters for the man movment
const parameters2 = {
    movX: 0,
    movY: 0,
    movZ: 0
};
/**
 * parachute with man
 */
const group = new THREE.Group()
group.position.set(-200,10000,-1000)

//human
let human
gltfloader.load(
    '/models/human/human.gltf',
    function (gltf) {
     gltf.scene.scale.set(2000,2000,2000)
     gltf.scene.position.set(-200,1000,-170)
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        gltf.scene.traverse((chld) => {
            chld.castShadow = true;
            chld.receiveShadow = true;
        });
       
        group.add(gltf.scene);
        human = gltf.scene;
     
    }
);
//parachute
let parachute
gltfloader.load(
    '/models/parachute 2/parachute.gltf',
    function (gltf) {
     gltf.scene.scale.set(500,500,500)
     gltf.scene.position.set(-300,-700,-500)
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        gltf.scene.traverse((chld) => {
            chld.castShadow = true;
            chld.receiveShadow = true;
        });
       
        group.add(gltf.scene);
        parachute = gltf.scene;
     
    }
);
const group2 = new THREE.Group()
group2.position.set(-200,15000,-100)
scene.add(group2);
//Airplane Model
let Airplanemodel
gltfloader.load(
    '/models/Airplane 1/Airplane 1.gltf',
    function (gltf) {
      gltf.scene.scale.set(5,5,5)
     gltf.scene.position.set(-200,15000,-100)
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        gltf.scene.traverse((chld) => {
            chld.castShadow = true;
            chld.receiveShadow = true;
        });
       gltf.scene.position.x += 1.75;
       group2.add(gltf.scene);
        Airplanemodel = gltf.scene;
     
    }
);
/**
 *  man
 */
const group1 = new THREE.Group()
group1.position.set(-200,10000,-1000)

//human
let human1
gltfloader.load(
    '/models/human/human.gltf',
    function (gltf) {
     gltf.scene.scale.set(2000,2000,2000)
     gltf.scene.position.set(-200,1000,-170)
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        gltf.scene.traverse((chld) => {
            chld.castShadow = true;
            chld.receiveShadow = true;
        });
       
        group1.add(gltf.scene);
        human1 = gltf.scene;
     
    }
);

//textures

let materialArray = [];
let ft = new THREE.TextureLoader().load('./skybox/penguins (21)/meadow_ft.jpg')
let bk = new THREE.TextureLoader().load('./skybox/penguins (21)/meadow_bk.jpg')
let up = new THREE.TextureLoader().load('./skybox/penguins (21)/meadow_up.jpg')
let dn = new THREE.TextureLoader().load('./skybox/penguins (21)/meadow_dn.jpg')
let rt = new THREE.TextureLoader().load('./skybox/penguins (21)/meadow_rt.jpg')
let lf = new THREE.TextureLoader().load('./skybox/penguins (21)/meadow_lf.jpg')

materialArray.push(new THREE.MeshBasicMaterial({map:ft}))
materialArray.push(new THREE.MeshBasicMaterial({map:bk}))
materialArray.push(new THREE.MeshBasicMaterial({map:up}))
materialArray.push(new THREE.MeshBasicMaterial({map:dn}))
materialArray.push(new THREE.MeshBasicMaterial({map:rt}))
materialArray.push(new THREE.MeshBasicMaterial({map:lf}))

for (let i=0 ; i<6 ; i++){
    materialArray[i] .side = THREE.BackSide
    }
    
 /**
  * skyBoxx
  */   
let skyboxGeo=new THREE.BoxGeometry(30000,20000,30000);
let skyboxx=new THREE.Mesh(skyboxGeo,materialArray);
skyboxx.position.x=0;
skyboxx.position.y=10000;
skyboxx.position.z=0;

scene.add(skyboxx);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#FFFFFF", 0.6);
directionalLight.castShadow = true;

directionalLight.shadow.camera.far = 1500;
directionalLight.shadow.camera.left = - 600;
directionalLight.shadow.camera.top = 600;
directionalLight.shadow.camera.right = 600;
directionalLight.shadow.camera.bottom = - 600;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.position.set(-500, 1000, 0);

scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', function(){
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 1, 500000);
camera.position.set(-900, 100, -900);
//camera.lookAt(human.position)
scene.add(camera);
// Define the camera movement variables
let cameraDistance = 6000; // distance from the human model
let cameraHeight =2000; // height above the human model

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//Audio
const listner = new THREE.AudioListener();
camera.add(listner)
const audioloader = new THREE.AudioLoader();

const airsound = new THREE.Audio(listner)

audioloader.load('./sound/138981__huggy13ear__tarp-flapping.wav' , function(buffer){
   airsound.setBuffer(buffer);
   airsound.setLoop(true);
   airsound.setVolume(0.4);
   //airsound.play()
});
const parachutesound = new THREE.Audio(listner)

audioloader.load('./sound/620310__2create__parachute-opening-2-options.wav' , function(buffer){
    parachutesound.setBuffer(buffer);
    parachutesound.setLoop(false);
    parachutesound.setVolume(0.4);
    //parachutesound.play()
 });
 const collisionsound = new THREE.Audio(listner)

audioloader.load('./sound/596522__eugeneeverett__parachute-opening.wav' , function(buffer){
    collisionsound.setBuffer(buffer);
    collisionsound.setLoop(false);
    collisionsound.setVolume(1);
    //collisionsound.play()
 });

let i = 0;
// Define function to handle keyboard input
function onKeyDown(event) {
    switch (event.keyCode) {
        case 65:
            console.log('A key')
              //Group1 Model
              scene.remove(group);
              scene.add(group1);
            //group1.rotateX(90);
             
             // group1.position.set(-100,-800,-100)
             person.pos.copy(airplanee.pos);
             person.v.copy(airplanee.v);
            
              console.log("AAAAAAAAAAAAA   " + person.pos.x + " " + person.pos.y + " "+ person.pos.z);
            
            break;
        case 83:
            console.log('S key')
            scene.remove(group1)
            //Group Model
            scene.add(group);
            break;
        // case 83:
        //     tick();
            
           // group.position.copy(p1.pos);

            //collisionsound.play()
            //break;
            case 87:
                console.log('W key')
                  //Group Model
                  scene.remove(group)
                  scene.add(group1);
                 // person.pos.copy(airplanee.pos);
                  group1.position.set(0,10000,0)
                  group1.rotateX(90);
                break;
                case 68:
                    console.log('D key')
                     tick_1();
                    break;
                    case 69:
                    console.log('E key')
                     tick1();
                    break;
                    case 82:
                        console.log('R key')
                         tick2();
                        break;
                        case 84:
                        console.log('T key')
                         tick3();
                        break;
                        case 89:
                        console.log('Y key')
                         tick4();
                        break;
                        case 85:
                        console.log('U key')
                         tick5();
                        break;
                        case 73:
                        console.log(' I key')
                         tick6();
                        break;
                        case 79:
                        console.log('O key')
                         tick7();
                        break;
                        case 80:
                        console.log('P key')
                         tick8();
                        break;
                        case 81:
                            console.log('Q key')
                            tick9();
                            break;
                        



    }
}
// Add event listener to document object
document.addEventListener('keydown', onKeyDown)
// objectsH

var airplanee = new Airplane();
airplanee.v.set(0, 0, 50);
airplanee.pos.set(0 ,100, 0);
var person = new Person1();
person.v.set(0, 0, 0);
person.pos.set(0 ,100, 0);

var p1 = new Parachute1();
p1.a.set(0, 0, 0);
p1.v.set(0, 0, 0);
p1.pos.set(0,10000,0);
 
var p2 = new Parachute2();
p2.a.set(0, 0, 0);
p2.v.set(0, 0, 0);
p2.pos.set(0,10000,0);

var p3 = new Parachute3();
p3.a.set(0, 0, 0);
p3.v.set(0, 0, 0);
p3.pos.set(0,10000,0);

var p4 = new Parachute4();
p4.a.set(0, 0, 0);
p4.v.set(0, 0, 0);
p4.pos.set(0,10000,0);

var p5 = new Parachute5();
p5.a.set(0, 0, 0);
p5.v.set(0, 0, 0);
p5.pos.set(0,10000,0);
var p6 = new Parachute6();
p6.a.set(0, 0, 0);
p6.v.set(0, 0, 0);
p6.pos.set(0,10000,0);
var p7 = new Parachute7();
p7.a.set(0, 0, 0);
p7.v.set(0, 0, 0);
p7.pos.set(0,10000,0);
var p8 = new Parachute8();
p8.a.set(0, 0, 0);
p8.v.set(0, 0, 0);
p8.pos.set(0,10000,0);
var p9 = new Parachute9();
p9.a.set(0, 0, 0);
p9.v.set(0, 0, 0);
p9.pos.set(0,10000,0);



/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;
//init
function tick() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       
    //group1.position.copy(p1.pos);
       airplanee.calc(deltaTime);
       group2.position.copy(airplanee.pos);

    
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}
//man
function tick_1() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
    
    p1.calc(deltaTime);
       //group.position.copy(parash.pos);
       group1.position.copy(p1.pos);
       console.log(p1.v);
       
    //   
    
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick_1);
}

function tick1() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p1.calc(deltaTime);
       group.position.copy(p1.pos);
       controls.update();
    console.log(p1.v);
    
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick1);
}
function tick2() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p2.calc(deltaTime);
       group.position.copy(p2.pos);
    
    console.log(p2.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick2);
}
function tick3() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p3.calc(deltaTime);
       group.position.copy(p3.pos);
    
    console.log(p3.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick3);
}
function tick4() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p4.calc(deltaTime);
       group.position.copy(p4.pos);
    
    console.log(p4.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick4);
}
function tick5() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p5.calc(deltaTime);
       group.position.copy(p5.pos);
    
    console.log(p5.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick5);
}
function tick6() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p6.calc(deltaTime);
       group.position.copy(p6.pos);
    
    console.log(p6.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick6);
}
function tick7() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p7.calc(deltaTime);
       group.position.copy(p7.pos);
    
    console.log(p7.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick7);
}
function tick8() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p8.calc(deltaTime);
       group.position.copy(p8.pos);
    
    console.log(p8.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick8);
}
function tick9() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = (elapsedTime - previousTime)*10;
    previousTime = elapsedTime;
    
       p9.calc(deltaTime);
       group.position.copy(p9.pos);
    
    console.log(p9.v);
    controls.update();
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick9);
}

tick();


/**
 * overlay
 */
const overlaygeo = new THREE.PlaneGeometry(2,2,1,1)
const overlaymat = new THREE.ShaderMaterial({
    transparent:true,
    uniforms:
    {
         uAlpha : {value:1}
    },
    vertexShader:  `
      void main()	{
        gl_Position = 
           vec4(position, 1.0);
      }
      `,
      fragmentShader: `
      uniform float uAlpha;
      
      void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
      }
      `,
  });
  const overlay = new THREE.Mesh(overlaygeo , overlaymat)
  overlay.position.set()
  scene.add(overlay)