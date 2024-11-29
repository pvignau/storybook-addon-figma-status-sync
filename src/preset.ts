import type { StorybookConfig } from 'storybook/internal/types'

import { KEY } from './constants'
import { getDataFromOptions } from './figmaData'
import { withFigmaSync } from './utils/withFigmaSync'

export const experimental_indexers: StorybookConfig['experimental_indexers'] =
  withFigmaSync

export const managerHead: StorybookConfig['managerHead'] = async (
  config,
  options,
) => {
  return `<script>window.${KEY} = ${JSON.stringify(getDataFromOptions(options))};</script>`
}
