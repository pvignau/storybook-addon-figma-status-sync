import { KEY } from '../constants'
import type { FigmaComponentStatus } from '../types'

/**
 * Finds and returns the Figma sync data stored by this plugin.
 * @returns The Figma sync data if set, else function to use.
 */
export const getFigmaSyncData = (): FigmaComponentStatus[] => {
  return window.parent[KEY]
}
