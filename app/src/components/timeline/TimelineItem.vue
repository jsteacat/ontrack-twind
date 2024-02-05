<script setup>
import { ref } from 'vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import { isTimelineItemValid } from '@/validators'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const options = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' }
]

const selectedActivityId = ref(null)
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-8">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :options="options"
      :selected="selectedActivityId"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
