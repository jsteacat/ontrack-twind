<script setup>
import { nextTick, ref, watchPostEffect } from 'vue'
import TimelineItem from '@/components/timeline/TimelineItem.vue'
import { isTimelineItemsValid, isPageValid } from '@/validators'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants.js'

const props = defineProps({
  timelineItems: {
    type: Object,
    required: true,
    validator: isTimelineItemsValid
  },
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()
  const options = { behavior: isSmooth ? 'smooth' : 'auto' }
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1]?.$el.scrollIntoView(options)
  }
}

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
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
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
