<script setup>
import { computed, provide, ref } from 'vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheHeader from './components/header/TheHeader.vue'
import TheNav from './components/nav/TheNav.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants'
import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  id,
  generatePeriodSelectOptions
} from './functions'
import { currentPage, timelineRef } from '@/useRouter'

const activities = ref(generateActivities())

const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
provide('timelineItems', timelineItems.value)
provide('activitySelectOptions', activitySelectOptions.value)
provide('periodSelectOptions', generatePeriodSelectOptions())

function createActivity(name) {
  if (name)
    activities.value.unshift({
      id: id(),
      name,
      secondsToComplete: 0
    })
}

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds = activitySeconds
}
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      ref="timelineRef"
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
