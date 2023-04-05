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
  NearestFilter,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  alphaMap,
  BufferAttribute,
  DoubleSide
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

camera.position.set(-10, 40, 30);
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
scene.add(plane);

const geometry = new BoxGeometry(5, 5, 5);
// 添加纹理
const texture = new TextureLoader().load(require("../assets/awso.jpg"));
//环境遮挡图
const aoMapTexture=new TextureLoader().load(require("../assets/awso.jpg"));
//设置偏移
// texture.offset.set(0,0.5)
//设置旋转45度 及旋转中心点 旋转是 逆时针的
// texture.center.set(0.5,0.5)
// texture.rotation=Math.PI/2
//设置纹理重复 及纹理的重复模式  包裹模式
// wrapS水平方向 ，就是y轴为中心  另一个反之
// texture.repeat.set(2,3)
// texture.wrapS=MirroredRepeatWrapping
// texture.wrapT=MirroredRepeatWrapping
// console.log(888,texture)

// magFilter用于像素很低的图片，NearestFilter可以画出像素
// texture.magFilter=NearestFilter

//透明材质  alphaMap与transparent配合
//透明材质图
// const alphaTexture= new TextureLoader().load(require("../assets/heibai.png"));
// const material = new MeshBasicMaterial({  map: texture,alphaMap:alphaTexture,transparent:true,opacity:0.3 });
const material = new MeshBasicMaterial({  map: texture,aoMap:aoMapTexture});
const cube = new Mesh(geometry, material);
//aoMap
scene.add(cube);
geometry.setAttribute('uv2',new BufferAttribute(geometry.attributes.uv.array,2))
console.log(cube)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const plane_geometry2 = new PlaneGeometry( 5, 5 );
const plane_material2 = new MeshBasicMaterial( { side: DoubleSide,map: texture} );
const plane2 = new Mesh( plane_geometry2, plane_material2 );
plane2.position.set(18,10,0)
scene.add(plane2)


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
