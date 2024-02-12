import { PAGE_TIMELINE, HOURS_IN_DAY, MIDNIGHT_HOUR, SECONDS_IN_HOUR } from '@/constants'
import { isPageValid } from '@/validators'

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizePageHash() {
  // hash without '#'
  const hash = window.location.hash.slice(1)

  if (isPageValid(hash)) {
    return hash
  }

  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export function generateTimelineItems() {
  const timelineItems = []

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour += 1) {
    timelineItems.push({ hour })
  }

  return timelineItems
}

export function generateActivitySelectOptions(activities) {
  return activities.map(({ name, id }) => ({ label: name, value: id }))
}

export function generateActivities() {
  return [
    { id: id(), name: 'Coding', secondsToComplete: 0 },
    { id: id(), name: 'Reading', secondsToComplete: SECONDS_IN_HOUR },
    { id: id(), name: 'Training', secondsToComplete: 2 * SECONDS_IN_HOUR }
  ]
}
