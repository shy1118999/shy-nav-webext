<!--
 * @Author: shaohang-shy
 * @Date: 2022-05-26 19:15:13
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-04-28 11:29:51
 * @Description: Calendar
-->
<script setup lang="ts">
import Calendar from '~/utils/calendar-util'

interface Props {
  id?: string | number
  row?: number
  column?: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  row: 1,
  column: 1,
  title: '文件夹',
})

const sizeType = computed(() => {
  if (props.row < 2 || props.column < 2)
    return 'small'
  else if (props.row < 4 && props.column < 4)
    return 'medium'
  else
    return 'large'
})

const now = useNow()

const calendar = computed(() => {
  return new Calendar({
    date: now.value,
    selected: '',
    startDate: '',
    endDate: '',
    range: '',
  })
})
const showLunar = ref(false)
const weeks = computed(() => {
  return calendar.value.weeks
})
const nowDate = computed(() => {
  return calendar.value.getInfo(calendar.value.date.fullDate)
})
const weekName = ['日', '一', '二', '三', '四', '五', '六']
const weekZh: Record<number, string> = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}

const showDetailPop = ref(false)
function noop() { }

const currentDate = ref('2022-08')
const currentCalendar = computed(() => {
  return new Calendar({
    date: currentDate.value,
    selected: '',
    startDate: '',
    endDate: '',
    range: '',
  })
})
const currentWeeks = computed(() => {
  return currentCalendar.value.weeks
})
</script>

<template>
  <!-- 中：星期+日+年月+农历 -->
  <!-- 大：星期+日+年月+农历 + 日历 -->
  <div rounded="$icon-radius" h-full w-full cursor-pointer overflow-hidden bg-white dark:bg-black @click="showDetailPop = true">
    <!-- 小：星期+日 -->
    <div v-if="sizeType === 'small'" h-full w-full flex flex-col items-center justify-center backdrop-blur-md>
      <span text-sm text-red-600>
        {{ weekZh[now.getDay()] }}
      </span>
      <span text-4xl font-bold>
        {{ now.getDate() }}
      </span>
    </div>
    <div v-else-if="sizeType === 'medium'" h-full w-full flex flex-col items-start justify-center p-2>
      <!-- 大：星期+日+年月+农历 + 日历 -->
      <span text-sm text-red-600>
        {{ weekZh[now.getDay()] }}
      </span>
      <span text-4xl font-bold>
        {{ now.getDate() }}
      </span>
      <span text-sm>
        {{ now.getFullYear() }}年{{ now.getMonth() + 1 }}月
      </span>
      <span text-sm>
        {{ nowDate.lunar.IMonthCn }} {{ nowDate.lunar.IDayCn }}
      </span>
    </div>
    <div v-else-if="sizeType === 'large'" h-full w-full flex flex-row items-center justify-around>
      <div flex flex-col items-start justify-center p-5>
        <!-- 大：星期+日+年月+农历 + 日历 -->
        <span text-sm text-red-600>
          {{ weekZh[now.getDay()] }}
        </span>
        <span text-4xl font-bold>
          {{ now.getDate() }}
        </span>
        <span text-sm>
          {{ now.getFullYear() }}年{{ now.getMonth() + 1 }}月
        </span>
        <span text-sm>
          {{ nowDate.lunar.IMonthCn }} {{ nowDate.lunar.IDayCn }}
        </span>
      </div>
      <table style="border-collapse: collapse" flex-1>
        <tbody>
          <tr>
            <th v-for="(week, index) in weekName" :key="index">
              {{ week }}
            </th>
          </tr>
          <tr v-for="(week, index) in weeks" :key="index">
            <td v-for="(day, i) in week" :key="i" :class="{ 'day-disabled': day.disable }">
              <div v-if="day.isDay" text-blue>
                {{ day.date }}
              </div>
              <div v-else text-sm>
                {{ day.date }}
              </div>
              <div v-if="!showLunar" />
              <div v-else-if="day.lunar.festival">
                {{ day.lunar.festival }}
              </div>
              <div v-else-if="day.lunar.Term">
                {{ day.lunar.Term }}
              </div>
              <div v-else-if="day.lunar.lDay === 1">
                {{ day.lunar.IMonthCn }}
              </div>
              <div v-else>
                {{ day.lunar.IDayCn }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <teleport to="body">
      <Transition name="nested">
        <template v-if="showDetailPop">
          <div
            bg="gray/30" fixed bottom-0 left-0 right-0 top-0 z-99999 pt-50 backdrop-blur-sm
            @click.stop="showDetailPop = false" @contextmenu.stop="showDetailPop = false"
          >
            <div
              max-w="60%" h="80%" bg="light-300/80" dark:bg="gray-500/80" relative m-auto flex flex-row
              @click.stop="noop"
            >
              <!-- 内容 -->
              <table style="border-collapse: collapse" flex-1>
                <tbody>
                  <tr>
                    <th v-for="(week, index) in weekName" :key="index">
                      {{ week }}
                    </th>
                  </tr>
                  <tr v-for="(week, index) in currentWeeks" :key="index">
                    <td v-for="(day, i) in week" :key="i" w-50 cursor-pointer text-center :class="{ 'day-disabled': day.disable }">
                      <div v-if="day.isDay" text-blue>
                        {{ day.date }}
                      </div>
                      <div v-else text-sm>
                        {{ day.date }}
                      </div>
                      <!-- eslint-disable-next-line vue/no-constant-condition -->
                      <div v-if="false" />
                      <div v-else-if="day.lunar.festival">
                        {{ day.lunar.festival }}
                      </div>
                      <div v-else-if="day.lunar.Term">
                        {{ day.lunar.Term }}
                      </div>
                      <div v-else-if="day.lunar.lDay === 1">
                        {{ day.lunar.IMonthCn }}
                      </div>
                      <div v-else>
                        {{ day.lunar.IDayCn }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div w="30%" relative flex flex-col items-start justify-center p-5>
                <div absolute top-0>
                  <input v-model="currentDate" type="month" bg-transparent>
                </div>
                <!-- 大：星期+日+年月+农历 + 日历 -->
                <span text-sm text-red-600>
                  {{ weekZh[now.getDay()] }}
                </span>
                <span text-4xl font-bold>
                  {{ now.getDate() }}
                </span>
                <span text-sm>
                  {{ now.getFullYear() }}年{{ now.getMonth() + 1 }}月
                </span>
                <span text-sm>
                  {{ nowDate.lunar.IMonthCn }} {{ nowDate.lunar.IDayCn }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </Transition>
    </teleport>
  </div>
</template>

<style scoped>
.day-disabled {
  color: rgba(0, 0, 0, 0.26);
}
.dark .day-disabled {
  color: rgba(255, 255, 255, 0.26);
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-leave-active {
  transition-delay: 0;
}

.nested-enter-from,
.nested-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
