import { ref } from 'vue'
import { activities } from '@/useActivities'
import { HOURS_IN_DAY } from '@/constants'

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
  }))
}

export const timelineItems = ref(generateTimelineItems(activities.value))

export function updateTimelineItem(timeline, fields) {
  return Object.assign(timeline, fields)
}

export function resetTimelineItemActivities(activity) {
  timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .forEach((timelineItem) =>
      updateTimelineItem(timelineItem, { activityId: null, activitySeconds: 0 })
    )
}

export function getTotalActivitySeconds(activity) {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .reduce(
      (totalSeconds, timelineItem) => Math.round(totalSeconds + timelineItem.activitySeconds),
      0
    )
}

function hasActivity(timelineItem, activity) {
  return timelineItem.activityId === activity.id
}
