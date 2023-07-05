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
  CubeTextureLoader,
  SphereBufferGeometry,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  displacementScale,
  DirectionalLight,
  AmbientLight,
  BufferAttribute,
  MeshStandardMaterial,
  DoubleSide,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
renderer.setClearColor("#fb7299", 0.5);
renderer.setSize(window.innerWidth, window.innerHeight);

const axes = new AxesHelper(40);
scene.add(axes);
const planeGeometry = new PlaneGeometry(60, 20);
const meshBasicMaterial = new MeshBasicMaterial({ color: "#1e1e1e" });
const plane = new Mesh(planeGeometry, meshBasicMaterial);

plane.rotation.x = -0.5 * Math.PI;


//光源
// 灯光
// 环境光
const light = new AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//直线光源
const directionalLight = new DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);


const cubeTextureLoader = new CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
 ("../assetsrequire/environmentMaps/1/px.jpg"),
  require("../assets/environmentMaps/1/nx.jpg"),
  require("../assets/environmentMaps/1/py.jpg"),
 require("../assets/environmentMaps/1/ny.jpg") ,
 require("../assets/environmentMaps/1/pz.jpg") ,
 require("../assets/environmentMaps/1/nz.jpg") ,
]);

const sphereGeometry = new SphereBufferGeometry(1, 20, 20);
const material = new MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
    // envMap: envMapTexture,
});
const sphere = new Mesh(sphereGeometry, material);
scene.add(sphere);
scene.background=envMapTexture
scene.environment =envMapTexture

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
