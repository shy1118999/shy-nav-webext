<!--
 * @Author: shaohang-shy
 * @Date: 2022-07-23 09:59:56
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-09-30 17:56:19
 * @Description: Checkbox
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  checked: boolean
  color?: string
}>(), {
  color: '#0084ff',
})
const emit = defineEmits(['change'])
</script>

<template>
  <svg
    class="icon" aria-hidden="true"
    :style="{ fill: props.color }"

    m-1 h-5 w-5 cursor-pointer transition-all hover:shadow-md
    @click="emit('change')"
  >
    <transition name="nested">
      <use v-if="props.checked" xlink:href="#icon-checkbox-checked" />
      <use v-else xlink:href="#icon-checkbox-unchecked" />
    </transition>

  </svg>
</template>

<style scoped>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.1s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0;
}

.nested-enter-from,
.nested-leave-to {
  transform-origin: center;
  transform: scale(0.1);
  opacity: 0;
}
</style>
