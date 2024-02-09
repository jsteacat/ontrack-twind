<script setup>
import ActivityItem from '@/components/activities/ActivityItem.vue'
import { isActivityItemsValid, isActivityItemValid } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivityItemsValid
  }
})

const emit = defineEmits({
  deleteActivity: isActivityItemValid
})
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
  </div>
</template>
