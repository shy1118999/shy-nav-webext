<!--
 * @Author: shaohang-shy
 * @Date: 2021-12-28 23:51:07
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-09-30 17:56:15
 * @Description: AppItem
-->
<script lang="ts" setup>
interface Props {
  icon: string
  url: string
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  icon: 'https://files.codelife.cc/website/jd.svg',
  url: 'https://jd.com',
  title: 'icon',
})

function handleClick() {
  if (props.url)
    window.open(props.url, '_blank')
}
</script>

<template>
  <div

    relative h-full w-full flex flex-col cursor-pointer items-center justify-center overflow-hidden
    class="app-item-icon"
    @click="handleClick"
  >
    <img :src="props.icon" :title="props.title" block h-full w-full object-cover>
  </div>
</template>

<style scoped>
.app-item-icon {
  transition: all 0.2s;
  border-radius: var(--icon-radius);
}
.app-item-icon:hover{
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
.dark .app-item-icon:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}
</style>
