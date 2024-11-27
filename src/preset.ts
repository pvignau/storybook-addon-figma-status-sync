import fs from 'fs'
import path from 'path'

import type { Options, StorybookConfig } from 'storybook/internal/types'
import picocolors from 'picocolors'

import type { FigmaComponentStatus } from './types'
import { ADDON_ID, KEY } from './constants'
import { withFigmaSyncTags } from './utils/withFigmaSyncTags'

interface FigmaSyncInitOpts {
  data?: FigmaComponentStatus[]
  path?: string
}

let _figmaData: FigmaComponentStatus[] = []
function figmaSyncInit(opts: FigmaSyncInitOpts) {
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

function getDataFromOptions(options: Options) {
  if (!_figmaData && KEY in options) {
    figmaSyncInit(options[KEY])
  }

  return _figmaData
}

export const experimental_indexers: StorybookConfig['experimental_indexers'] =
  async (existingIndexers, options) => {
    return withFigmaSyncTags(existingIndexers, getDataFromOptions(options))
  }

export const managerHead: StorybookConfig['managerHead'] = async (
  config,
  options,
) => {
  return `<script>window.${KEY} = ${JSON.stringify(getDataFromOptions(options))};</script>`
}
