import { HOURS_IN_DAY, NAV_ITEMS, MIDNIGHT_HOUR } from '@/constants'

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }) {
  return typeof hour === 'number' && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
}

export function isTimelineItemsValid(items) {
  return items.every(isTimelineItemValid)
}

function isSelectOptionValid({ value, label }) {
  return typeof value === 'number' && typeof label === 'string'
}

export function isSelectOptionsValid(options) {
  return options.every(isSelectOptionValid)
}