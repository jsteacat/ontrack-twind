<script setup>
import TimelineItem from '@/components/timeline/TimelineItem.vue'
import {
  isTimelineItemsValid,
  isSelectOptionsValid,
  isActivityItemsValid,
  isTimelineItemValid,
  isActivityItemValid
} from '@/validators'

defineProps({
  timelineItems: {
    type: Object,
    required: true,
    validator: isTimelineItemsValid
  },
  activities: {
    type: Array,
    required: true,
    validator: isActivityItemsValid
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: isSelectOptionsValid
  }
})

const emit = defineEmits({
  setTimelineItemActivity({ timelineItem, activity }) {
    return [isTimelineItemValid(timelineItem), isActivityItemValid(activity)].every(Boolean)
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
        :activities="activities"
        :activity-select-options="activitySelectOptions"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activity: $event })"
      />
    </ul>
  </div>
</template>
