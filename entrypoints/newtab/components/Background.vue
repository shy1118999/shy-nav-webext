<!--
 * @Author: shaohang-shy
 * @Date: 2021-12-28 23:38:53
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-10-01 19:59:24
 * @Description: Background Component
-->
<script lang="ts" setup>
import background from '~/storage/background'
import showBingBg from '~/storage/showBingBg'

const bingBg = ref('')
getBingBg()
function getBingBg() {
  fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN').then(res => res.json()).then((data: any) => {
    const url = `https://cn.bing.com/${data.images[0].url}`
    bingBg.value = url
  })
}

const currentBackground = computed(() => {
  if (showBingBg.value && bingBg.value) {
    return { type: 'image', src: bingBg.value, backgroundColor: '#0084FF' }
  }
  return background.value
})
</script>

<template>
  <div
    fixed bottom-0 left-0 right-0 top-0 z--1 transition-all transition-duration-400 transition-ease
    :style="{ backgroundColor: currentBackground.backgroundColor }"
  >
    <div
      v-if="currentBackground.type === 'image'"
      h-full w-full bg-cover bg-center bg-no-repeat object-cover transition-duration-200
      :style="{ backgroundImage: `url(${currentBackground.src})` }"
    />
  </div>
</template>

<style scoped>
.app-background {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  filter: blur(0px);
  z-index: -1;
  transition: 0.4s ease;
}
.app-background-img {
  position: relative;
  transition: 0.2s;
  opacity: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: 0.3s;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
