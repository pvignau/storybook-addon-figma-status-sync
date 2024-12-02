import type { Options } from '@storybook/blocks'
import changeCase from 'change-case'

import type { FigmaSyncHooks, FigmaSyncOptions } from './types'
import { KEY } from './constants'

/**
 * Default behaviours for FigmaSync tag generation.
 */
const defaultHooks: FigmaSyncHooks = {
  /**
   * Extracts the name out of a story index entry by
   * reading the import path of the story, and taking
   * the part of the filename before `.stories.*`.
   * @param opts.entry The entry to get a component name from.
   * @returns The computed component name.
   */
  getComponentName({ entry }) {
    return entry.importPath
      .split('/')
      .pop()
      .replace(/\.stories\.[a-z]+$/, '')
  },

  /**
   * Extracts the version of a component out of a story, by
   * reading the version tag and returning its suffix.
   * @param opts.entry The entry to get a component version from.
   * @returns The computed component version or null.
   */
  getComponentVersion({ entry }) {
    return (
      entry.tags
        .find((tag) => tag.match(/version:.*/))
        ?.replace(/^version:/, '') ?? null
    )
  },
  /**
   * Extracts the category of a component out of a story, by
   * reading its title suffix.
   * @param opts.entry The entry to get a component category from.
   * @returns The computed component category or null.
   */
  getComponentCategory({ entry }) {
    return entry.title.replace(/\/[^/]*$/, '')
  },

  /**
   * Finds the Figma entry for a given Storybook name.
   * @param opts.componentName The Storybook name to search for.
   * @param opts.figmaData The fetched Figma Sync data.
   * @returns The Figma component status or null if it couldn't be found.
   */
  getFigmaEntry({ componentName, figmaData }) {
    const normalisedComponentName = changeCase.pascalCase(componentName)
    return (
      figmaData.find(
        ({ name }) => changeCase.pascalCase(name) === normalisedComponentName,
      ) ?? null
    )
  },

  /**
   * Returns tags to apply to the Storybook entry being indexed, which will
   * override the ones defined in the CSF file.
   *
   * Use this hook to adjust the title e.g. to inject the tags suggested by
   * this addon, e.g. `deprecated`, `outdated`, `code-only`, etc. Remember to
   * return the original entry tags if you want to preserve them.
   *
   * @returns A list of tags to use for the entry instead of the original ones.
   */
  overrideTags: (suggestedTags, { entry }) => [...entry.tags, ...suggestedTags],
}

export function initHooks(
  options: Options & { [KEY]?: FigmaSyncOptions },
): FigmaSyncHooks {
  return {
    getComponentName:
      options?.[KEY]?.getComponentName ?? defaultHooks.getComponentName,
    getComponentVersion:
      options?.[KEY]?.getComponentVersion ?? defaultHooks.getComponentVersion,
    getComponentCategory:
      options?.[KEY]?.getComponentCategory ?? defaultHooks.getComponentCategory,
    getFigmaEntry: options?.[KEY]?.getFigmaEntry ?? defaultHooks.getFigmaEntry,
    overrideTags: options?.[KEY]?.overrideTags ?? defaultHooks.overrideTags,
  }
}
