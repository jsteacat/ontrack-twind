<script setup>
import BaseSelect from '@/components/base/BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import {
  isTimelineItemValid,
  isSelectOptionsValid,
  isActivityItemsValid,
  isActivityItemValid
} from '@/validators'
import { NULLABLE_ACTIVITY } from '@/constants'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
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
  selectActivity: isActivityItemValid
})

function getActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}

function selectActivity(id) {
  emit('selectActivity', getActivityById(id))
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-8">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      placeholder="Rest"
      @select="selectActivity($event)"
    />
  </li>
</template>
