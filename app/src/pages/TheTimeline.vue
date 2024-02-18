<script setup>
import { nextTick, ref, watchPostEffect } from 'vue'
import TimelineItem from '@/components/timeline/TimelineItem.vue'
import {
  isTimelineItemsValid,
  isSelectOptionsValid,
  isActivityItemsValid,
  isTimelineItemValid,
  isActivityItemValid,
  isPageValid,
  isNumber
} from '@/validators'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants.js'

const props = defineProps({
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
  },
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityItemValid(activity)].every(Boolean)
  },
  updateTimelineItemActivitySeconds(timelineItem, seconds) {
    return [isTimelineItemValid(timelineItem), isNumber(seconds)].every(Boolean)
  }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

function scrollToHour(hour = null) {
  hour ??= new Date().getHours()
  const options = { behavior: 'smooth' }
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1]?.$el.scrollIntoView(options)
  }
}

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour()
  }
})
</script>

<template>
  <div class="mt-10">
    <ul>
      <TimelineItem
        ref="timelineItemRefs"
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activities="activities"
        :activity-select-options="activitySelectOptions"
        @scroll-to-hour="scrollToHour"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
