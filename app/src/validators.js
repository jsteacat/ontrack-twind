import { HOURS_IN_DAY, NAV_ITEMS, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants'

export function isPageValid(page) {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
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
  if (isNull(id)) return true
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isActivityItemsValid(items) {
  return items.every(isActivityItemValid)
}

export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem)
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

export function isNull(value) {
  return value === null
}

export function isUndefinedOrNull(value) {
  return [null, undefined].includes(value)
}

export function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

export function isNumber(value) {
  return typeof value === 'number'
}

function isSelectOptionValid({ value, label }) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

export function isString(value) {
  return typeof value === 'string'
}
