import { addons } from 'storybook/internal/manager-api'

import { ADDON_ID, KEY } from './constants'
import type { FigmaComponentStatus } from './types'

// Extend the Window interface to include our Figma data.
declare global {
  interface Window {
    [KEY]: FigmaComponentStatus[]
  }
}

addons.register(ADDON_ID, () => {})
