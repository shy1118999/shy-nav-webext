<!--
 * @Author: shaohang-shy
 * @Date: 2022-03-20 14:31:34
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-08-15 10:38:43
 * @Description: Apps
-->
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperController } from 'swiper'
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import draggable from 'vuedraggable'
import apps from '~/storage/apps'
import activeIndex from '~/storage/swiperActiveIndex'

const swiperController = ref<SwiperController>()

function handleToPage(id: number | string) {
  swiperController.value?.slideTo(apps.value.findIndex(x => x.id === id) ?? 0, 500)
}

const showAppsMenu = ref(false)
</script>

<template>
  <Swiper
    :pagination="false"
    :keyboard="{
      enabled: true,
    }"
    :mousewheel="true"

    w-full flex-1
    :initial-slide="activeIndex"
    :modules="[Pagination, Keyboard, Mousewheel]"
    @swiper="x => swiperController = x"
    @slide-change="e => activeIndex = e.activeIndex"
  >
    <SwiperSlide v-for="item in apps" :key="item.id" overflow-auto>
      <draggable
        :list="item.list"
        item-key="id"
        force-fallback="true"
        group="apps"
        :delay="50"
        :touch-start-threshold="5"
        animation="300"
        class="app-grid grid grid-flow-row-dense mx-auto h-full max-w-1200px justify-center p-5 pb-100px"
      >
        <template #item="{ element }">
          <div
            :data-item="element.id"
            class="app-item swiper-no-swiping"
            :style="{
              '--cell-column': element.column,
              '--cell-row': element.row,
            }"
          >
            <!-- 实际组件 -->
            <component
              :is="element.component"
              data-shy-type="app-item"
              :data-id="element.id"
              :data-url="element.url"
              v-bind="element"
            />
            <!-- 标题 -->
            <div class="app-item-title" truncate>
              {{ element.title }}
            </div>
          </div>
        </template>
      </draggable>
    </SwiperSlide>
  </Swiper>
  <transition name="fade">
    <div
      v-show="showAppsMenu"

      fixed bottom-0 left-0 z-99999 h-100px w-full flex items-center justify-center rounded-t-xl bg-gray-100 bg-opacity-30
    >
      <div
        v-for="item in apps"
        :key="item.id"

        h="80%"
        flex="~"

        color="#666666"
        mx-2 box-border w-6em flex-col cursor-pointer items-center justify-around hover:box-border hover:rounded-xl hover:bg-white hover:opacity-80
        :title="item.name"
        @click.stop="handleToPage(item.id)"
      >
        <svg class="icon" text-3xl aria-hidden="true">
          <use :xlink:href="item.icon" />
        </svg>
        <p w-full truncate>
          {{ item.name }}
        </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s;
}
.app-grid {
  grid-template-columns: repeat(
    auto-fill,
    calc(var(--icon-size) + var(--icon-gap-y))
  );
  grid-template-rows: repeat(
    auto-fill,
    calc(var(--icon-size) + var(--icon-gap-x))
  );
}
.app-item {
  grid-column: span var(--cell-row);
  grid-row: span var(--cell-column);
  width: calc(
    var(--icon-size) * var(--cell-row) + var(--icon-gap-y) * var(--cell-row)
  );
  height: calc(
    var(--icon-size) * var(--cell-column) + var(--icon-gap-x) *
      var(--cell-column)
  );

  border-radius: var(--icon-radius);
  padding: 0 calc(var(--icon-gap-y) / 2) calc(var(--icon-gap-x));
  /* transition: 0.3s ease-in-out; */
}
.app-item-title {
  color: var(--icon-name-color);
  padding: 3px 0;
  display: var(--icon-name-display);
  /* line-height: calc(2 * var(--icon-gap-y)); */
}
.drag-box {
  display: flex;
  flex-direction: row;

}
</style>
