<script setup>
import TimelineItem from '@/components/timeline/TimelineItem.vue'
import { isTimelineItemsValid, isSelectOptionsValid } from '@/validators'

defineProps({
  timelineItems: {
    type: Object,
    required: true,
    validator: isTimelineItemsValid
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: isSelectOptionsValid
  }
})
</script>

<template>
  <div class="mt-10">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>
