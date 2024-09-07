<!--
 * @Author: shaohang-shy
 * @Date: 2022-03-26 15:38:32
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-09-30 17:47:13
 * @Description: create app
-->
<script setup lang="ts">
import allApps from '~/config/apps'

const emit = defineEmits(['close'])
const apps = ref([...allApps])
function noop(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
}
function handleClickMask(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  emit('close')
}
function handleInput(e: any) {
  apps.value = allApps.filter((x) => {
    return x.name.includes(e.target?.value)
  })
}
</script>

<template>
  <div

    bg="gray/30"

    fixed bottom-0 left-0 right-0 top-0 z-99999 backdrop-blur-sm
    @click.stop="handleClickMask"
    @contextmenu.stop="handleClickMask"
  >
    <div

      bg="gray/60"

      absolute bottom-0 right-0 top-0 z-999999 w-120 flex flex-col items-start justify-start overflow-auto p-5
      @click.stop="noop"
      @contextmenu.stop="noop"
    >
      <div

        sticky top-0 w-full rounded-xl
        bg="white/80"
      >
        <input color="black/50" h-60px w-full bg-transparent p-2 text-3xl leading-60px @input="handleInput">
      </div>
      <div
        v-for="item, index in apps"
        :key="index"

        bg="white/20"
        my-2 w-full flex rounded-xl p-3
      >
        <img :src="item.icon" h-70px w-70px rounded-xl>
        <div w-full flex flex-col items-start justify-around p-2 style="width: calc(100% - 70px)">
          <div w-full truncate text-left :title="item.name">
            {{ item.name }}
          </div>
          <div w-full truncate text-left :title="item.description">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
