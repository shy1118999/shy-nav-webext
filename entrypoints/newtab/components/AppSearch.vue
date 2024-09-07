<!--
 * @Author: shaohang-shy
 * @Date: 2022-03-20 14:29:50
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2022-09-30 17:56:00
 * @Description: AppSearch
-->
<script lang="ts" setup>
import searchEngine from '~/storage/searchEngine'
import currentSearchEngine from '~/storage/currentSearchEngine'
import currentSuggestEngine from '~/storage/currentSuggestEngine'
import { baiduSuggestParser, bingSuggestParser, googleSuggestParser } from '~/utils/suggestParser'

const suggestEngine = [
  { key: 'baidu', name: '百度', parser: baiduSuggestParser },
  { key: 'bing', name: '必应', parser: bingSuggestParser },
  { key: 'google', name: '谷歌', parser: googleSuggestParser },
]

const searchValue = ref('')
const originalSearchValue = ref('')
const searchInput = ref<HTMLInputElement>()
const showMoreSearchEngine = ref(false)

function handleClick(_e: MouseEvent) {
  showMoreSearchEngine.value = false
}
watchEffect(() => {
  if (showMoreSearchEngine.value) {
    setTimeout(() => {
      window.addEventListener('click', handleClick)
    })
  }
  else { window.removeEventListener('click', handleClick) }
})
const suggests = ref<string[]>([])

function search() {
  window.open(currentSearchEngine.value.url.replace('{$1}', searchValue.value), '_blank')
  suggests.value = []
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  searchValue.value = target.value
  originalSearchValue.value = target.value
}

const selectedSuggestIndex = ref(-1)
function getSuggests(v: string) {
  const parser = suggestEngine.find(x => x.key === currentSuggestEngine.value)?.parser
  if (!parser)
    return
  parser(v).then((result) => {
    suggests.value = result
  })
}

watchDebounced(originalSearchValue, () => {
  if (!originalSearchValue.value) {
    suggests.value = []
    return
  }
  getSuggests(originalSearchValue.value)
}, { debounce: 200, maxWait: 200 })

function handleUp() {
  if (suggests.value.length <= 0) {
    selectedSuggestIndex.value = -1
    return
  }
  // 向上
  if (selectedSuggestIndex.value === -1) {
    selectedSuggestIndex.value = suggests.value.length - 1
  }
  else {
    selectedSuggestIndex.value = (selectedSuggestIndex.value - 1 + suggests.value.length) % suggests.value.length
  }
  searchValue.value = suggests.value[selectedSuggestIndex.value]
}

function handleDown() {
  if (suggests.value.length <= 0) {
    selectedSuggestIndex.value = -1
    return
  }
  // 向下
  selectedSuggestIndex.value = (selectedSuggestIndex.value + 1) % suggests.value.length
  searchValue.value = suggests.value[selectedSuggestIndex.value]
}

function handleCloseSuggestions() {
  suggests.value = []
}
</script>

<template>
  <div
    flex="~" relative z-99 my-10 h-15 items-center justify-center rounded-50 bg-white bg-opacity-10 backdrop-blur-md
    lg:mx-30 md:mx-20 xl:mx-100
  >
    <div
      flex="~" relative h-full cursor-pointer items-center justify-center rounded-l-50 bg-white bg-opacity-40 px-1em
      @click="showMoreSearchEngine = !showMoreSearchEngine"
    >
      <!-- 当前的导航方式 -->
      <svg class="icon" text-3xl aria-hidden="true">
        <use :xlink:href="currentSearchEngine.icon" />
      </svg>
      <!-- 下拉箭头 -->
      <div v-if="!showMoreSearchEngine" i-carbon:caret-down ml-1 text-xl />
      <div v-else i-carbon:caret-up ml-1 text-xl />
    </div>
    <transition name="bounce">
      <div
        v-show="showMoreSearchEngine" h="150/100" top="120/100" absolute left-0 z-99999 w-full flex items-center
        rounded-xl bg-white bg-opacity-70 p-x-2em backdrop-blur-md
      >
        <div
          v-for="(item, index) in searchEngine" :key="index" h="80%" flex="~" box-border w-5em flex-col
          cursor-pointer items-center justify-around hover:box-border hover:rounded-xl hover:bg-white hover:opacity-80
          color="#666666" @click.stop="(e) => {
            currentSearchEngine = item
            showMoreSearchEngine = false
            searchInput?.focus()
          }"
        >
          <svg class="icon" text-3xl aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </transition>
    <input
      ref="searchInput" :value="searchValue" autofocus placeholder="Enter your search content..." type="text"
      flex-1 p-5 focus:outline-none bg="transparent" @keydown.up.prevent="handleUp" @keydown.down.prevent="handleDown"
      @keydown.enter="search" @input="handleInput" @keydown.esc.prevent="handleCloseSuggestions"
    >
    <button h-full rounded-50 px-10 btn focus:outline-none @click="search">
      Search
    </button>
    <div class="absolute left-0 top-110% w-full overflow-hidden rounded-2xl bg-#eeeeeecc dark:bg-#333333cc">
      <div v-for="item, idx in suggests" :key="idx" class="leading-32px" :class="{ 'bg-gray bg-opacity-30': idx === selectedSuggestIndex }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateY(-50%) rotateX(90deg);
  }

  /* 50% {
    opacity: 0.5;
    transform: translateY(-20%) rotateX(45deg);
  } */
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}
</style>
