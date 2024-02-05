import { HOURS_IN_DAY, NAV_ITEMS, MIDNIGHT_HOUR } from '@/constants'

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }) {
  return isNumber(hour) && isHourValid(hour)
}

export function isHourValid(hour) {
  return hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
}

export function isTimelineItemsValid(items) {
  return items.every(isTimelineItemValid)
}

export function isSelectOptionsValid(options) {
  return options.every(isSelectOptionValid)
}

export function isUndefinedOrNull(value) {
  return [null, undefined].includes(value)
}

function isSelectOptionValid({ value, label }) {
  return isNumber(value) && isString(label)
}

function isNumber(value) {
  return typeof value === 'number'
}

function isString(value) {
  return typeof value === 'string'
}