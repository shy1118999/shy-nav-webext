<!--
 * @Author: shaohang-shy
 * @Date: 2022-05-28 09:33:00
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-09-30 17:56:22
 * @Description: Dialog
-->
<script setup lang="ts">
const visible = ref(false)
</script>

<template>
  <transition :duration="300">
    <div v-show="visible" fixed bottom-0 left-0 right-0 top-0>
      <div>
        <!-- Mask -->
      </div>
    </div>
  </transition>
</template>
