<!--
 * @Author: shaohang-shy
 * @Date: 2022-03-27 19:02:08
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-04-28 11:28:54
 * @Description:
-->
<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { imageToBase64 } from '~/utils'

const emit = defineEmits(['close', 'submit', 'createPage'])
const inputUrl = ref('')
const inputTitle = ref('')
const inputIcon = ref('')

async function handleDrop(e: any) {
  const file = e.dataTransfer.files[0]
  if (/^image\/.*$/.test(file.type))
    inputIcon.value = await imageToBase64(file) as string
}

function handleSubmit() {
  if (inputUrl.value.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('请输入url')
    return
  }
  if (inputTitle.value.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('请输入名称')
    return
  }
  if (inputIcon.value.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('请输入图标')
    return
  }

  emit('submit', {
    title: inputTitle.value,
    url: inputUrl.value,
    icon: inputIcon.value,
    id: uuid(),
    column: 1,
    row: 1,
    component: 'AppItemIcon',
  })
}

onMounted(() => {
  document.addEventListener('drop', (e) => {
    // 拖离
    e.preventDefault()
  })
  document.addEventListener('dragleave', (e) => {
    // 拖后放
    e.preventDefault()
  })
  document.addEventListener('dragenter', (e) => {
    // 拖进
    e.preventDefault()
  })
  document.addEventListener('dragover', (e) => {
    // 拖来拖去
    e.preventDefault()
  })
})

const inputFolderName = ref('')
function handleSubmitFolder() {
  if (inputFolderName.value.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('请输入名称')
    return
  }
  emit('submit', {
    id: uuid(),
    title: inputFolderName.value,
    column: 1,
    row: 1,
    component: 'AppFolder',
    apps: [],
  })
}
function handleAddCalendar() {
  emit('submit', {
    title: '日历',
    id: uuid(),
    column: 1,
    row: 1,
    component: 'calendar',
  })
}
function handleAddTodoList() {
  emit('submit', {
    title: '代办事项',
    id: uuid(),
    column: 1,
    row: 1,
    component: 'todoList',
  })
}
const inputPageName = ref('')
const inputPageIcon = ref('#icon-a-xiaolianbiaoqing')
const pageIcons = [
  '#icon-a-bizuigangabiaoqingxiaolian',
  '#icon-a-gangaliuhanbiaoqingxiaolian',
  '#icon-a-baochitaiduobiaoqingxiaolian',
  '#icon-a-keaiyouqudeganxingqubiaoqingxiaolian',
  '#icon-a-dakubeishangshangxinbiaoqingxiaolian',
  '#icon-a-bucuohaochiweidaobiaoqingxiaolian',
  '#icon-a-aixihuanliukoushuisebiaoqingxiaolian',
  '#icon-a-eabukenengbiaoqingxiaolian',
  '#icon-a-aimujingpeijingyangwasejingyabiaoqingxiaolian',
  '#icon-a-nulifendoujiayoubiaoqingxiaolian',
  '#icon-a-kuxiaobudegangaxingqiubiaoqing',
  '#icon-a-xiaolianbiaoqing',
  '#icon-a-gaoxinghaoxinqingbiaoqingxihuanbiaoqingxiaolian',
  '#icon-a-kuzhuangkushuaiqishuashuaibiaoqingxiaolian',
  '#icon-a-keshuishuijuebiaoqingxiaolian',
  '#icon-zhuangkeai',
  '#icon-a-shengqifennumaohuofenkaiqifenbiaoqingxiaolian',
  '#icon-a-jingyajingqiwasetianlabiaoqingxiaolian',
  '#icon-a-taibanglejingyabangbangdebiaoqingxiaolian',
  '#icon-a-aiqingxihuansebiaoqingxiaolian',
]
function handleSubmitPage() {
  if (inputPageName.value.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('请输入名称')
    return
  }
  if (inputPageIcon.value.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('请输入图标')
    return
  }
  emit('createPage', {
    id: uuid(),
    iconType: 'iconfont',
    title: inputPageName.value,
    icon: inputPageIcon.value,
    list: [],
  })
}
</script>

<template>
  <!-- 添加页面 -->
  <h3 my-2 text-left text-xl font-bold>
    添加分页
  </h3>
  <p text-left>
    名称
  </p>
  <input
    v-model="inputPageName"

    my-2 h-60px w-full rounded-xl px-2 text-xl
    bg="white/50"
    placeholder="请输入名称"
  >
  <div w-full flex flex-wrap>
    <!--  -->
    <div
      v-for="item in pageIcons" :key="item"
      :class="{ 'bg-white': item === inputPageIcon }"
      rounded-xl p-2
      @click="inputPageIcon = item"
    >
      <svg class="icon" text-3xl aria-hidden="true">
        <use :xlink:href="item" />
      </svg>
    </div>
  </div>
  <div w-full flex justify-end>
    <button m-2 btn @click="handleSubmitPage">
      添加分页
    </button>
  </div>
  <div h-0 w-full border-t border-dashed />
  <!-- 添加App图标 -->
  <h3 my-2 text-left text-xl font-bold>
    添加APP图标
  </h3>

  <!-- 地址 -->
  <p text-left>
    网址
  </p>
  <input
    v-model="inputUrl"

    my-2 h-60px w-full rounded-xl px-2 text-xl
    bg="white/50"
    placeholder="请输入网址"
  >
  <!-- 名称 -->
  <p text-left>
    名称
  </p>
  <input
    v-model="inputTitle"

    my-2 h-60px w-full rounded-xl px-2 text-xl
    bg="white/50"
    placeholder="请输入名称"
  >
  <!-- 图标 -->
  <p text-left>
    图标
  </p>
  <input
    v-model="inputIcon"

    my-2 h-60px w-full rounded-xl px-2 text-xl
    bg="white/50"
    placeholder="请输入图标链接或者拖到下方~"
  >
  <div bg="white/50" my-2 h-120px w-120px rounded-xl @drop="handleDrop">
    <!--  -->
    <img v-if="inputIcon" h-120px w-120px :src="inputIcon">
    <p v-else h-full w-full flex items-center justify-center p-2>
      请将图标拖到此处
    </p>
  </div>
  <div w-full flex justify-end>
    <button m-2 btn @click="handleSubmit">
      确定
    </button>
  </div>
  <div h-0 w-full border-t border-dashed />
  <h3 my-2 text-left text-xl font-bold>
    添加文件夹
  </h3>
  <!-- 名称 -->
  <p text-left>
    名称
  </p>
  <input
    v-model="inputFolderName"

    my-2 h-60px w-full rounded-xl px-2 text-xl
    bg="white/50"
    placeholder="请输入名称"
  >
  <div w-full flex justify-end>
    <button m-2 btn @click="handleSubmitFolder">
      确定
    </button>
  </div>
  <div h-0 w-full border-t border-dashed />
  <div w-full flex justify-start>
    <button m-2 btn @click="handleAddCalendar">
      添加日历
    </button>
    <button m-2 btn @click="handleAddTodoList">
      添加Todo
    </button>
  </div>
  <div h-0 w-full border-t border-dashed />
</template>
