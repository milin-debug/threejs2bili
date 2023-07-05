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
  SpotLight,
  AmbientLight,
  MeshStandardMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as Dat from 'dat.gui'
const dat = new Dat.GUI()
//// 目标：灯光与阴影
// 灯光阴影
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
// 3、设置光照投射阴影 SpotLight.castShadow = true;
// 4、设置物体投射阴影 sphere.castShadow = true;
// 5、设置物体接收阴影 plane.receiveShadow = true;

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
// renderer.setClearColor("#fb7299", 0.5);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.physicallyCorrectLights=true  // 快要废弃的
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

//光源
// 灯光
// 环境光
const light = new AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//直线光源
const spotLight = new SpotLight(0xffffff, 1);
spotLight.position.set(5,5,5);
spotLight.castShadow = true;
// 设置阴影贴图模糊度
spotLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096, 4096);
scene.add(spotLight);





const sphereGeometry = new SphereBufferGeometry(1, 20, 20);
const sphere = new Mesh(sphereGeometry, material);
sphere.castShadow = true;
scene.add(sphere);




const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;



function render() {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement);
  render();
});

dat.add(sphere.position, "x").min(-5).max(5).step(0.1);

dat
  .add(spotLight, "angle")
  .min(0)
  .max(Math.PI/2)
  .step(0.1)
dat.add(spotLight, "penumbra").min(0).max(1).step(0.01);
dat.add(spotLight, "distance").min(0).max(10).step(0.01);
  
dat.add(spotLight, "decay").min(0).max(5).step(0.01);
// dat.add(spotLight, "distance").min(0).max(10).step(0.01);

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
