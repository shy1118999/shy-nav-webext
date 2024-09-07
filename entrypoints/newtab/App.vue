<!--
 * @Author: shaohang-shy
 * @Date: 2024-09-05 14:51:02
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2024-09-05 14:51:02
 * @Description: App
-->

<script setup lang="ts">
import appItemSetting from './storage/appItemSetting'

const varStyle = computed(() => ({
  '--icon-size': `${appItemSetting.value.iconSize}px`,
  '--icon-gap-x': `${appItemSetting.value.iconGapX}px`,
  '--icon-gap-y': `${appItemSetting.value.iconGapY}px`,
  '--icon-radius': `${appItemSetting.value.iconRadius}px`,
  '--icon-name-size': `${appItemSetting.value.iconNameSize}px`,
  '--icon-name-color': appItemSetting.value.iconNameColor,
  '--icon-name-display': appItemSetting.value.showIconName ? 'block' : 'none',
}))
function showJson(style: any) {
  const s = []
  for (const i in style)
    s.push(`${i}:${style[i]}`)
  return s.join(';')
}
watchEffect(() => {
  document.body.setAttribute('style', showJson(varStyle.value))
})
</script>

<template>
  <Background />
  <Footer fixed right-6 top-0 />

  <main

    box-border h-full w-full font-sans
    text="center gray-700 dark:gray-200"
  >
    <router-view />
  </main>
</template>

<style>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
