import Movements from "./movements.js";
import { VRButton } from './VRButton.js';
import blockchain from "./Web3.js"


// Declaration of a new scene with three.js

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1ef);

/////////////////////////////////////////////////////////////////////////////////////////////

// Camera and renderer configuration
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;
/////////////////////////////////////////////////////////////////////////////////////////////

// lights  + light direction
const ambient_light = new THREE.AmbientLight(0xbda355);
const direction_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);


/////////////////////////////////////////////////////////////////////////////////////////////
//setting flat plane in metaverse!
const geometry_space = new THREE.BoxGeometry(5000, 0.2, 5000);

const material_space = new THREE.MeshPhongMaterial({color: 0x808080})

const space = new THREE.Mesh( geometry_space, material_space);

scene.add(space);




/////////////////////////////////////////////////////////////////////////////////////////////

// creating a cube!
// declaring shape
const geometry = new THREE.BoxGeometry( 20, 40, 30 );
//declaring material
const material = new THREE.MeshPhongMaterial( { color:0x000000 } );
// declaring cube in scene
const cube = new THREE.Mesh( geometry, material );
//add cube to scene with view from camera postion
camera.position.x = 100;


camera.position.set(10, 5, 40)
/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
//geometric figure to be represetned in metaverse

const geometry_cone = new THREE.ConeGeometry( 5, 20, 32);
const material_cone = new THREE.MeshPhongMaterial( {color: 0xed810a});
const cone = new THREE.Mesh( geometry_cone, material_cone);
scene.add(cone);

cone.position.set(-10, 5, 20)



camera.position.set(10, 5, 40)

///////////////////////////////////////////////////////////////////////////////////////////////////
//cylinder
const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 10, 32 );
const material_cylinder = new THREE.MeshPhongMaterial( {color: 0x0000ff} );
const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
scene.add( cylinder );

cylinder.position.set(20, 5, 0)
/////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function animate() {
    renderer.setAnimationLoop(render);
}


function render() {

    //rotate cube
  //  cube.rotation.x += 0.01
 //   cube.rotation.y += 0.01
    //rotate.cone
    //cone.rotation.x += 0.01
  //  cone.rotation.y += 0.01
    //rotate cylinder 
  //  cylinder.rotation.z += 0.01
    cylinder.rotation.x += 0.1



    //rotate camera
    //camera.position.y -= .01
	requestAnimationFrame( animate );

//Movemnt to th left
if (Movements.isPressed(37)){
    camera.position.x -= 0.5;
}
//movement up
if (Movements.isPressed(38)){
    camera.position.x += 0.5;
    camera.position.y += 0.5;
}
//Movemnt to the right
 if (Movements.isPressed(39)){
        camera.position.x += 0.5;
    }
    //movemtn down
if (Movements.isPressed(40)){
    camera.position.x -= 0.5;
    camera.position.y -= 0.5;
}
  camera.lookAt(space.position);

    renderer.render( scene, camera );
}
animate();


//Web3 connection to the data generatedin the blockchain 
//to represented in the metaverse but object!

blockchain.then((result) =>{
    // for each building that is paid for in smart contract 
    // a graphical representation is made in the metaverse
    result.building.forEach((building, index) => {
        if(index <= result.supply) {
            //representation of NFT Tokens as cubes
            const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
            const boxMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
            const nft = new THREE.mesh(boxGeometry, boxMaterial);
            nft.position.set(building.x, building.y, building.z);
            scene.add(nft);
        }
    })
})



