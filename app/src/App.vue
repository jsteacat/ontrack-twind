<script setup>
import { ref } from 'vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheHeader from './components/header/TheHeader.vue'
import TheNav from './components/nav/TheNav.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants'
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions
} from './functions'

const currentPage = ref(normalizePageHash())
const timelineItems = generateTimelineItems()
const activities = ['Coding', 'Reding', 'Training']

const activitySelectOptions = generateActivitySelectOptions(activities)

function goTo(page) {
  currentPage.value = page
}
</script>

<template>
  <TheHeader @update-current-page="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @update-current-page="goTo($event)" />
</template>
