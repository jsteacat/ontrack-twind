import { PAGE_TIMELINE, HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants'
import { isPageValid } from '@/validators'

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