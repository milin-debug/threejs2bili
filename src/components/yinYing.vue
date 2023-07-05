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
  DirectionalLight,
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
// 3、设置光照投射阴影 directionalLight.castShadow = true;
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

const axes = new AxesHelper(40);
scene.add(axes);
const planeGeometry = new PlaneGeometry(60, 20);
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
const directionalLight = new DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(4096, 4096);
scene.add(directionalLight);

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;

// 修改相机的属性
dat
  .add(directionalLight.shadow.camera, "near")
  .min(0)
  .max(60)
  .step(0.1)
  .onChange(() => {
    // 每次修改要更新投影矩阵
    directionalLight.shadow.camera.updateProjectionMatrix();
  });


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
