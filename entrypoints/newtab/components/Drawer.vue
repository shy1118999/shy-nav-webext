<!--
 * @Author: shaohang-shy
 * @Date: 2022-07-16 17:15:48
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-09-30 17:47:23
 * @Description: Drawer
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  show: boolean
}>(), {})
const emit = defineEmits(['close'])
function handleClickMask(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  emit('close')
}
function noop(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
}
</script>

<template>
  <Transition :duration="550" name="nested">
    <div
      v-if="props.show"
      bg="gray/30" fixed bottom-0 left-0 right-0 top-0 z-99999 backdrop-blur-sm
      @click.stop="handleClickMask"
      @contextmenu.stop="handleClickMask"
    >
      <div
        bg="gray/60" absolute bottom-0 right-0 top-0 z-999999 w-120 overflow-auto p-5 @click.stop="noop"
        @contextmenu.stop="noop"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
