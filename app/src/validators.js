import { HOURS_IN_DAY, NAV_ITEMS, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants'

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

export function isActivityItemValid({ id, name, secondsToComplete }) {
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isActivityItemsValid(items) {
  return items.every(isActivityItemValid)
}

export function isSelectOptionsValid(options) {
  return options.every(isSelectOptionValid)
}

export function isButtonTypeValid(type) {
  return BUTTON_TYPES.includes(type)
}

export function isUndefined(value) {
  return value === undefined
}

export function isUndefinedOrNull(value) {
  return [null, undefined].includes(value)
}

export function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

function isSelectOptionValid({ value, label }) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

function isNumber(value) {
  return typeof value === 'number'
}

function isString(value) {
  return typeof value === 'string'
}
