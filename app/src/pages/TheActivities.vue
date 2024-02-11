<script setup>
import ActivityItem from '@/components/activities/ActivityItem.vue'
import TheActivityForm from '@/components/activities/TheActivityForm.vue'
import { isActivityItemsValid, isActivityItemValid } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivityItemsValid
  }
})

const emit = defineEmits({
  createActivity: isActivityItemValid,
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
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
