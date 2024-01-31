import { HOURS_IN_DAY, NAV_ITEMS } from '@/constants'

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }) {
  return typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY
}

export function isTimelineItemsValid(items) {
  return items.every(isTimelineItemValid)
}

export function isSelectOptionsValid(options) {
  return options.every(
        ({ value, label }) => typeof value === 'number' && typeof label === 'string'
      )
}