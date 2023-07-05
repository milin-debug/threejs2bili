<template>
    <div class='container' ref='containerRef'>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, AxesHelper, PlaneGeometry, MeshBasicMaterial, Mesh, BoxGeometry, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
const containerRef = ref<HTMLDivElement>()

const scene = new Scene()

const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.set(-10, 40, 30)
camera.lookAt(scene.position)

const renderer = new WebGLRenderer()
renderer.setClearColor('#f04c0a', 0.5)
renderer.setSize(window.innerWidth, window.innerHeight)

const axes = new AxesHelper(40)
scene.add(axes)
const planeGeometry = new PlaneGeometry(60, 20)
const meshBasicMaterial = new MeshBasicMaterial({ color: '#1e1e1e' })
const plane = new Mesh(planeGeometry, meshBasicMaterial)

// plane.rotation.x = -0.5 * Math.PI  //  负数是 顺时针
scene.add(plane)

const cubeGeometry = new BoxGeometry(2, 3, 4)
const cubeMaterial = new MeshBasicMaterial({ color: 0x00ff00 })
const cube = new Mesh(cubeGeometry, cubeMaterial)
cube.position.x = 3
cube.scale.set(1, 2, 8)
cube.rotation.set(Math.PI / 2, 0, 0) // 正数是 逆时针
scene.add(cube)
const controls = new OrbitControls(camera, renderer.domElement)
const clock = new Clock()
//   60帧 是    刷新的间隔 是   1000毫秒 /60
function render () {
  // 获取时钟运行的总时长
  const time = clock.getElapsedTime()
  // console.log('每两针之间的事件间隔', clock.getDelta())
  const t = time % 5 // 取余是为了让他回到原点   全等于 if cube.position.x>5 cube.postion =0
  cube.position.x = t * 1
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
  // renderer.render(scene, camera)
  render()
})

</script>

<style lang="scss" scoped>
.container{
    width:100vw;
    height:100vh;
}
</style>
