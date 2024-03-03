import { computed, ref } from 'vue'
import { id } from './functions'
import { SECONDS_IN_HOUR } from '@/constants.js'

function generateActivities() {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}

export const activities = ref(generateActivities())

function generateActivitySelectOptions() {
  return activities.value.map(({ name, id }) => ({ label: name, value: id }))
}

export const activitySelectOptions = computed(() => generateActivitySelectOptions())

export function createActivity(name) {
  if (name)
    activities.value.unshift({
      id: id(),
      name,
      secondsToComplete: 0
    })
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
