import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  PERIODS_IN_MINUTES,
  MILLISECONDS_IN_SECOND
} from '@/constants'
import { isNull, isPageValid } from '@/validators'

function generatePeriodSelectOptionsLabel(period) {
  const hours = Math.floor(period / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0')

  const minutes = (period % MINUTES_IN_HOUR).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

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

export function normalizeSelectValue(value) {
  return isNull(value) || isNaN(value) ? value : +value
}

export function generateTimelineItems() {
  const timelineItems = []

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour += 1) {
    timelineItems.push({ hour, activityId: null, activitySeconds: 0 })
  }

  return timelineItems
}

export function generateActivitySelectOptions(activities) {
  return activities.map(({ name, id }) => ({ label: name, value: id }))
}

export function generateActivities() {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}

export function generatePeriodSelectOptions() {
  return PERIODS_IN_MINUTES.map((period) => ({
    value: period * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(period)
  }))
}

export function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)
  const utc = date.toUTCString()

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}
