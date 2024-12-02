import changed from '../assets/dev-mode-changed.png?url'
import completed from '../assets/dev-mode-completed.png?url'
import readyForDev from '../assets/dev-mode-ready-for-dev.png?url'
import notReady from '../assets/dev-mode-not-ready.png?url'
import noData from '../assets/dev-mode-no-data.png?url'

export enum FigmaDevModeStatus {
  CHANGED = 'CHANGED',
  COMPLETED = 'COMPLETED',
  NOT_READY = 'NOT_READY',
  READY_FOR_DEV = 'READY_FOR_DEV',
  UNKNOWN = 'UNKNOWN',
}

const imageMap: Record<FigmaDevModeStatus, string> = {
  CHANGED: changed,
  COMPLETED: completed,
  NOT_READY: notReady,
  READY_FOR_DEV: readyForDev,
  UNKNOWN: noData,
}

const ariaLabelMap: Record<FigmaDevModeStatus, string> = {
  CHANGED: 'Changed',
  COMPLETED: 'Completed',
  NOT_READY: 'Not ready',
  READY_FOR_DEV: 'Ready for dev',
  UNKNOWN: 'Unknown',
}

const legendMap: Record<FigmaDevModeStatus, string> = {
  COMPLETED: 'The coded component is on-par with the one in Figma.',
  READY_FOR_DEV: 'The Figma component is ready for initial development.',
  CHANGED:
    'The Figma component has changes that need to be implemented in code.',
  NOT_READY: 'The component is not yet ready for development.',
  UNKNOWN: "Data is missing on this component's status in Figma.",
}

export function isValidKey(key: string): key is FigmaDevModeStatus {
  return key in FigmaDevModeStatus
}
export function getKeys(): FigmaDevModeStatus[] {
  return Object.keys(FigmaDevModeStatus) as FigmaDevModeStatus[]
}
export function getImage(key: string) {
  return isValidKey(key) ? imageMap[key] : imageMap.UNKNOWN
}
export function getAriaLabel(key: string) {
  return isValidKey(key) ? ariaLabelMap[key] : ariaLabelMap.UNKNOWN
}
export function getLegend(key: string) {
  return isValidKey(key) ? legendMap[key] : legendMap.UNKNOWN
}
