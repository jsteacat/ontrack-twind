<script setup>
import { ref } from 'vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECOND
} from '@/constants'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/base/BaseButton.vue'
import { isHourValid, isNumber } from '@/validators'
import { formatSeconds } from '@/functions'

const props = defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: isNumber
  },
  hour: {
    type: Number,
    required: true,
    validator: isHourValid
  }
})

const dynamicSeconds = ref(props.seconds)
const intervalId = ref(0)
const isStartButtonDisabled = props.hour !== new Date().getHours()

function start() {
  if (intervalId.value) return
  intervalId.value = setInterval(() => {
    dynamicSeconds.value += 1
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
  dynamicSeconds.value = 0
}
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
