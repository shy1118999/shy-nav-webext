<!--
 * @Author: shaohang-shy
 * @Date: 2024-09-11 11:17:24
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2024-09-11 11:17:24
 * @Description: json
-->
<script setup lang="ts">
import JSONEditor from 'jsoneditor'
import type { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

const editorRef = ref<HTMLElement>()
let editor: JSONEditor | null = null
onMounted(() => {
  const options: JSONEditorOptions = {
    mode: 'code',
    modes: ['code', 'tree'], // allowed modes
  }
  editor = new JSONEditor(editorRef.value!, options)
})

function copy() {
  const txt = JSON.stringify(editor?.get())
  navigator.clipboard.writeText(txt)
}

function copyFormat() {
  const txt = JSON.stringify(editor?.get(), null, 2)
  navigator.clipboard.writeText(txt)
}
</script>

<template>
  <div class="relative z-1 h-50px flex justify-right gap-2 p-10px">
    <button class="btn" @click="copy">
      copy
    </button>
    <button class="btn" @click="copyFormat">
      foramt copy
    </button>
  </div>
  <div ref="editorRef" class="w-full" style="height: calc(100vh - 50px)" />
</template>
