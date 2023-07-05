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
  TextureLoader,
  displacementMap,
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
// scene.add(plane);
//  第四五六个参数是与置换贴图相联系的
const geometry = new BoxGeometry(1,1,1,100,100,100);
// 添加纹理
const texture = new TextureLoader().load(require("../assets/color.jpg"));
//环境遮挡图
const aoMapTexture = new TextureLoader().load(
  require("../assets/ambientOcclusion.jpg")
);

//光源
// 灯光
// 环境光
const light = new AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//直线光源
const directionalLight = new DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);
const alphaTexture = new TextureLoader().load(require("../assets/alpha.jpg"));
const heightTexture = new TextureLoader().load(require("../assets/height.jpg"));
// 导入粗糙度贴图
const roughnessTexture = new TextureLoader().load("../assets/roughness.jpg");
//金属贴图
const metalnessTexture = new TextureLoader().load("../assets/metalness.jpg");
// 导入法线贴图
const normalTexture = new TextureLoader().load("../assets//door/normal.jpg");
const material = new MeshStandardMaterial({
  map: texture,
  alphaMap: alphaTexture,
   side: DoubleSide,
  transparent: true,
  aoMap: aoMapTexture,
  displacementMap: heightTexture ,
    displacementScale: 0.1, //比例
    roughness:0.3,
    roughnessTexture:roughnessTexture,
    metalness:1,
    metalnessMap:metalnessTexture,
    normalMap :normalTexture
});
// const material = new MeshBasicMaterial({  map: texture});
const cube = new Mesh(geometry, material);
//aoMap
scene.add(cube);
geometry.setAttribute(
  "uv2",
  new BufferAttribute(geometry.attributes.uv.array, 2)
);
console.log(geometry);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const plane_geometry2 = new PlaneGeometry(3, 3, 100, 100);
const plane_material2 = new MeshStandardMaterial({
  side: DoubleSide,
  map: texture,
  alphaMap: alphaTexture,
  transparent: true,
  aoMap: aoMapTexture,
  displacementMap: heightTexture,
  roughness:0,
  displacementScale: 0.1, //比例,
  roughnessTexture,
});
const plane2 = new Mesh(plane_geometry2, plane_material2);
plane2.position.set(10, 0, 0);
scene.add(plane2);

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
