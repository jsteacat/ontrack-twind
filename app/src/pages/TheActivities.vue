<script setup>
import ActivityItem from '@/components/activities/ActivityItem.vue'
import { isActivityItemsValid } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivityItemsValid
  }
})
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>
