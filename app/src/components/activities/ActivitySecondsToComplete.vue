<script setup>
import { computed } from 'vue'
import { formatSeconds } from '@/functions'
import { isActivityItemValid } from '@/validators'
import { getTotalActivitySeconds } from '@/useTimelineItems'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityItemValid
  }
})

const secondsDiff = computed(
  () => getTotalActivitySeconds(props.activity) - props.activity.secondsToComplete
)

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
)
</script>

<template>
  <div
    :class="colorClasses"
    class="flex items-center rounded bg-blue-100 px-2 font-mono text-xl text-blue-600"
  >
    {{ sign }} {{ formatSeconds(secondsDiff) }}
  </div>
</template>
