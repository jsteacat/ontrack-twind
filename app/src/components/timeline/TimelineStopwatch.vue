<script setup>
import { ref, watch } from 'vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECOND
} from '@/constants'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/base/BaseButton.vue'
import { isTimelineItemValid } from '@/validators'
import { formatSeconds, getCurrentHour } from '@/functions'
import { updateTimelineItem } from '@/useTimelineItems'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const dynamicSeconds = ref(props.timelineItem.activitySeconds)
const intervalId = ref(0)
const isStartButtonDisabled = props.timelineItem.hour !== getCurrentHour()

function start() {
  if (intervalId.value) return
  intervalId.value = setInterval(() => {
    dynamicSeconds.value += 1
    updateTimelineItem(props.timelineItem, { activitySeconds: dynamicSeconds.value })
  }, MILLISECONDS_IN_SECOND)
}

function stop() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = 0
  }
}

function reset() {
  stop()
  updateTimelineItem(props.timelineItem, { activitySeconds: 0 })
  dynamicSeconds.value = 0
}

watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItem(props.timelineItem, { activitySeconds: dynamicSeconds.value })
  }
)
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!dynamicSeconds" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(dynamicSeconds) }}
    </div>
    <BaseButton v-if="intervalId" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
