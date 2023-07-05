<template>
    <div class='container' ref='containerRef'  @click='divClick' >
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer,  PlaneGeometry, MeshStandardMaterial,AmbientLight, MeshBasicMaterial, Mesh, BufferGeometry, BufferAttribute } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const containerRef = ref<HTMLDivElement>()

const scene = new Scene()

const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.set(-10, 40, 30)
camera.lookAt(scene.position)

//画布
const renderer = new WebGLRenderer()
renderer.setClearColor('#8cd15f', 0.5)
renderer.setSize(window.innerWidth, window.innerHeight)


// MeshStandardMaterial  pbr
const planeGeometry = new PlaneGeometry(60, 20)
const material = new MeshStandardMaterial({ color: '#007acc' })
const plane = new Mesh(planeGeometry, material)

plane.rotation.x = -0.5 * Math.PI
scene.add(plane)

const light = new AmbientLight( 0x404040,0.9 ); // soft white light
scene.add( light );

 



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
