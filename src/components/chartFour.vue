<template>
    <div class='container' ref='containerRef'  @click='divClick' >
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, AxesHelper, PlaneGeometry, Color, MeshBasicMaterial, Mesh, BufferGeometry, BufferAttribute } from 'three'
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

for (let i = 0; i < 50; i++) {
  const geometry = new BufferGeometry()
  // Float32Array缓冲区元素个数
  const vertices = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    // 介于-5 到 5之间
    vertices[j] = Math.random() * 10 - 5 // 坐标位置
  }
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  const color = new Color(Math.random(), Math.random(), Math.random())
  const material = new MeshBasicMaterial({ color, transparent: true, opacity: Math.random() })
  const face = new Mesh(geometry, material)
  scene.add(face)
}

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
