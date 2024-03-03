<script setup>
import BaseSelect from '@/components/base/BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import { isTimelineItemValid, isUndefined } from '@/validators'
import TimelineStopwatch from '@/components/timeline/TimelineStopwatch.vue'
import { activitySelectOptions } from '@/useActivities'
import { updateTimelineItem } from '@/useTimelineItems'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const emit = defineEmits({
  scrollToHour: isUndefined
})
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-8">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
