import { DevStatusTrait } from '@figmarine/rest/dist'

export interface FigmaComponentStatus extends DevStatusTrait {
  name: string
  category: string
  version: string
  isDeprecated: boolean
}
