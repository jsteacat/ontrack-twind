<script setup>
import ActivityItem from '@/components/activities/ActivityItem.vue'
import TheActivityForm from '@/components/activities/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/activities/TheActivitiesEmptyState.vue'
import { activities } from '@/useActivities'
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity" />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm />
  </div>
</template>
