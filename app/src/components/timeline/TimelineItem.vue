<script setup>
import BaseSelect from '@/components/base/BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import { isTimelineItemValid, isHourValid } from '@/validators'
import TimelineStopwatch from '@/components/timeline/TimelineStopwatch.vue'
import { inject } from 'vue'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  scrollToHour: isHourValid
})

const setTimelineItemActivity = inject('setTimelineItemActivity')
const activitySelectOptions = inject('activitySelectOptions')
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-8">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      placeholder="Rest"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
