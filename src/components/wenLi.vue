<template>
    <div class='container' ref='containerRef'  @click='divClick' >
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, AxesHelper, PlaneGeometry, TextureLoader, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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


const geometry = new BoxGeometry(5, 5, 5)
// 添加纹理
const texture = new TextureLoader().load(require('../assets/logo.png'))

// 立即使用纹理进行材质创建
const material = new MeshBasicMaterial({ color: 0x00ff00, map: texture })
const cube = new Mesh(geometry, material)
scene.add(cube)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function render () {
  controls.update()
  renderer.render(scene, camera)

  requestAnimationFrame(render)
}
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
  render()
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
