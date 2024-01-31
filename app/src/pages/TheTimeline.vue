<script setup>
import TimelineItem from '@/components/timeline/TimelineItem.vue'
import { isTimelineItemsValid } from '@/validators'

defineProps({
  timelineItems: {
    type: Object,
    required: true,
    validator: isTimelineItemsValid
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
      />
    </ul>
  </div>
</template>
