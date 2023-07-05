<template>
  <div class="container" ref="containerRef" @click="divClick"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  PlaneGeometry,
  SphereBufferGeometry,
  Mesh,
  PointLight,
  AmbientLight,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Clock
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as Dat from 'dat.gui'
const dat = new Dat.GUI()


const containerRef = ref<HTMLDivElement>();

const scene = new Scene();

const camera = new PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0,0,10);
camera.lookAt(scene.position);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.useLegacyLights =false  //配合decay 使用

const axes = new AxesHelper(40);
scene.add(axes);
const planeGeometry = new PlaneGeometry(90, 90);
const material = new MeshStandardMaterial();
const plane = new Mesh(planeGeometry, material);

plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
plane.position.set(0, -1, 0);
scene.add(plane)


//创建小球  
const smallBox= new Mesh(
    new SphereBufferGeometry(0.1,20,20),
   new MeshBasicMaterial({color:0xff000})
)
smallBox.position.set(2,2,2) 



// 环境光
const light = new AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//点光源
const pointLight = new PointLight(0xff0000, 1);
// pointLight.position.set(5,5,5);
pointLight.castShadow = true;
// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(4096, 4096);
// scene.add(pointLight);  // 不直接添加到场景
// 点光源添加到小球上面
smallBox.add(pointLight);

scene.add(smallBox)



const sphereGeometry = new SphereBufferGeometry(1, 20, 20);
const sphere = new Mesh(sphereGeometry, material);
sphere.castShadow = true;
scene.add(sphere);




const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const clock=new Clock()
function render() {
 let time =clock.getElapsedTime()
  smallBox.position.x=Math.sin(time)*3
   smallBox.position.z=Math.cos(time)*3
   sphere.position.x=Math.cos(time)
  console.log('1111',time)
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement);
  render();
});

dat.add(sphere.position, "x").min(-5).max(5).step(0.1);


dat.add(pointLight, "distance").min(0).max(10).step(0.01);
  
dat.add(pointLight, "decay").min(0).max(5).step(0.01);
// dat.add(pointLight, "distance").min(0).max(10).step(0.01);

window.addEventListener("resize", () => {
  // 更新修改相机比例
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新画布大小
  renderer.setSize(
    window.innerWidth, // 宽度
    window.innerHeight // 高度
  );
  // 更新画布像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
