/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IndexInput, StoryIndexInput, Tag } from 'storybook/internal/types'

export interface FigmaComponentStatus {
  name: string
  category: string
  version: string
  isDeprecated: boolean
  devStatus: {
    type: string
    description: string | null
  } | null
}

interface _Shared {
  entry: StoryIndexInput
  indexInput: IndexInput[]
  figmaData: FigmaComponentStatus[]
}

interface _CmpName {
  componentName: string
}
interface _CmpCat {
  componentCategory: string
}
interface _FigmaEntry {
  figmaEntry: FigmaComponentStatus
}

export interface GetComponentNameParams extends _Shared {}
export interface GetComponentVersionParams extends _Shared, _CmpName {}
export interface GetComponentCategoryParams extends _Shared, _CmpName {}
export interface GetFigmaEntryParams extends _Shared, _CmpName {}
export interface OverrideTagsParams
  extends _Shared,
    _CmpName,
    _CmpCat,
    _FigmaEntry {}
export interface OverrideTitleParams
  extends _Shared,
    _CmpName,
    _CmpCat,
    _FigmaEntry {}

export interface FigmaSyncHooks {
  getComponentName?: (params: GetComponentNameParams) => string
  getComponentVersion?: (params: GetComponentVersionParams) => string
  getComponentCategory?: (params: GetComponentCategoryParams) => string
  getFigmaEntry?: (params: GetFigmaEntryParams) => FigmaComponentStatus | null
  overrideTags?: (suggested: Tag[], params: OverrideTagsParams) => Tag[]
  overrideTitle?: (
    mismatchedCategory: boolean,
    params: OverrideTitleParams,
  ) => string
}

export interface FigmaSyncOptions extends FigmaSyncHooks {
  data?: FigmaComponentStatus[]
  path?: string
}
