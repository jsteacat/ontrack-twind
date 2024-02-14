<script setup>
import ActivityItem from '@/components/activities/ActivityItem.vue'
import TheActivityForm from '@/components/activities/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/activities/TheActivitiesEmptyState.vue'
import { isActivityItemsValid, isActivityItemValid, isNumber } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: isActivityItemsValid
  }
})

const emit = defineEmits({
  createActivity: isActivityItemValid,
  deleteActivity: isActivityItemValid,
  setActivitySecondsToComplete(activity, secondsToComplete) {
    return [isActivityItemValid(activity), isNumber(secondsToComplete)].every(Boolean)
  }
})

function setSecondsToComplete(activity, secondsToComplete) {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
