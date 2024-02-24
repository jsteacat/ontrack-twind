<script setup>
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'
import TheHeader from '@/components/header/TheHeader.vue'
import TheNav from '@/components/nav/TheNav.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { currentPage, timelineRef } from '@/useRouter'
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline ref="timelineRef" v-show="currentPage === PAGE_TIMELINE" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
