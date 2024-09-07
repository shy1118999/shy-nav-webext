<!--
 * @Author: shaohang-shy
 * @Date: 2022-03-11 17:55:49
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-10-01 19:30:25
 * @Description:Fotter
-->
<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <nav mt-6 inline-flex gap-2 text-xl>
    <a
      i-carbon-logo-github icon-btn
      rel="noreferrer"
      href="https://github.com/shy1118999/shy-nav"
      target="_blank"
      title="GitHub"
    />
    <button class="icon-btn !outline-none" @click="toggleDark()">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>
  </nav>
</template>
