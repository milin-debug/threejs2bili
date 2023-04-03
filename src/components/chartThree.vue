<template>
444
    <div class='container' ref='containerRef'  @click='divClick' >
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
renderer.setClearColor('#fb7299', 0.5)
renderer.setSize(window.innerWidth, window.innerHeight)

const axes = new AxesHelper(40)
scene.add(axes)
const planeGeometry = new PlaneGeometry(60, 20)
const meshBasicMaterial = new MeshBasicMaterial({ color: '#1e1e1e' })
const plane = new Mesh(planeGeometry, meshBasicMaterial)

plane.rotation.x = -0.5 * Math.PI
scene.add(plane)

const cubeGeometry = new BoxGeometry(2, 3, 4)
const cubeMaterial = new MeshBasicMaterial({ color: 0x00ff00 })
const cube = new Mesh(cubeGeometry, cubeMaterial)
// cube.position.x = 3
cube.scale.set(1, 1, 1)
cube.rotation.set(Math.PI / 4, 0, 0) // 顺时针
scene.add(cube)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
const animate1 = gsap.to(cube.position, {
  duration: 1.5,
  ease: 'slow(0.7, 0.7, false)',
  delay: 2,
  repeat: -1,
  yoyo: true,
  x: 12,
  onComplete: () => {
    console.log('complete')
  }
})
gsap.to(cube.rotation, { duration: 2.5, ease: 'rough({ strength: 1, points: 20, template: none.out, taper: none, randomize: true, clamp: false })', x: Math.PI * 2 })
function render () {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
  render()
})
// 监听鼠标双击事件
document.addEventListener('dblclick', () => {
  // 获取当前状态
  const fullscreenElement = document.fullscreenElement
  if (fullscreenElement) {
    // 退出全屏
    document.exitFullscreen()

    return
  }
  // 请求画布全屏
  renderer.domElement.requestFullscreen()
})

window.addEventListener('resize', () => {
  // 更新修改相机比例
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新画布大小
  renderer.setSize(
    window.innerWidth, // 宽度
    window.innerHeight // 高度
  )
  // 更新画布像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})

</script>

<style lang="scss" scoped>
.container{
    width:100vw;
    height:100vh;
}
</style>
