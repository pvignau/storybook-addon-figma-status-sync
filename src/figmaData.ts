import fs from 'fs'
import path from 'path'

import type { Options } from 'storybook/internal/types'
import picocolors from 'picocolors'

import type { FigmaComponentStatus, FigmaSyncOptions } from './types'
import { ADDON_ID, KEY } from './constants'

let _figmaData: FigmaComponentStatus[]
function figmaSyncInit(opts: FigmaSyncOptions) {
  const { data, path: dataPath } = opts || {}

  if (data) {
    _figmaData = data
  } else if (dataPath) {
    if (!path.isAbsolute(dataPath)) {
      throw new Error(
        `${picocolors.bold(ADDON_ID)}: relative path to Figma data detected, please use an absolute path instead: ${picocolors.magentaBright(dataPath)}`,
      )
    }
    try {
      _figmaData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    } catch (e) {
      throw new Error(`${picocolors.bold(ADDON_ID)}: ${e.message}`)
    }
  } else if (opts !== undefined) {
    throw new Error(
      `${picocolors.bold(ADDON_ID)}: You must pass the status data fetched from the addon's companion script through either:
- ${picocolors.magentaBright(`options.${KEY}.data`)}: an array of Figma status entries collated by you
- ${picocolors.magentaBright(`options.${KEY}.path`)}: the absolute path to the JSON file created by the script`,
    )
  }

  return _figmaData
}

export function getDataFromOptions(
  options: Options & { [KEY]?: FigmaSyncOptions },
): FigmaComponentStatus[] {
  if (!_figmaData && KEY in options) {
    figmaSyncInit(options[KEY])
  }

  return _figmaData ?? []
}
