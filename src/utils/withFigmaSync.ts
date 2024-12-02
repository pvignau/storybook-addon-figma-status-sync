import type { Indexer, Options } from 'storybook/internal/types'
import semver from 'semver'

import type { FigmaSyncOptions } from '../types'
import { KEY } from '../constants'
import { getDataFromOptions } from '../figmaData'
import { initHooks } from '../hooks'

/**
 * Injects badges to stories
 * @param {Indexer[]} existingIndexers - The existing indexers
 * @returns {Indexer[]} - The new indexers with badges injected
 */
const withFigmaSync = (
  existingIndexers: Indexer[],
  options: Options & { [KEY]?: FigmaSyncOptions },
): Indexer[] => {
  const figmaData = getDataFromOptions(options)
  const hooks = initHooks(options)

  const badgedIndexers = existingIndexers.map(
    (indexer: Indexer): Indexer => ({
      test: indexer.test,
      async createIndex(...args) {
        const indexInput = await indexer.createIndex(...args)

        return indexInput.map((entry) => {
          if (entry.type !== 'story') {
            return entry
          }

          /* Get essential ID data from hooks. */
          const componentName = hooks.getComponentName({
            entry,
            figmaData,
            indexInput,
          })

          const rawComponentVersion = hooks.getComponentVersion({
            componentName,
            entry,
            indexInput,
            figmaData,
          })
          const componentVersion = rawComponentVersion
            ? semver.clean(rawComponentVersion)
            : null

          const componentCategory = hooks.getComponentCategory({
            componentName,
            entry,
            indexInput,
            figmaData,
          })

          const figmaEntry = hooks.getFigmaEntry({
            componentName,
            entry,
            figmaData,
            indexInput,
          })

          /* Generate tag suggestions first. */
          const tagSuggestions = []

          /* Figma name not found, assume the component only exists on the code side of things. */
          if (!figmaEntry) {
            tagSuggestions.push('code-only')
          }

          /* Propagate deprecated flag. */
          if (figmaEntry && figmaEntry.isDeprecated) {
            tagSuggestions.push('deprecated')
          }
          /* Local version could not be found, assume the component is still in progress. */
          if (!componentVersion) {
            tagSuggestions.push('experimental')
          }

          /* If version mismatch, we must warn our end users that they're late compared to Figma. */
          const figmaVersion = figmaEntry
            ? semver.clean(figmaEntry.version, { loose: true })
            : null
          if (
            componentVersion &&
            figmaVersion &&
            !semver.eq(componentVersion, figmaVersion)
          ) {
            tagSuggestions.push('version-mismatch')

            if (semver.lt(componentVersion, figmaVersion)) {
              tagSuggestions.push('outdated')
            }
          }

          const mismatchedCategory =
            figmaEntry &&
            figmaEntry.category &&
            componentCategory &&
            figmaEntry.category !== componentCategory
          if (mismatchedCategory) {
            tagSuggestions.push('category-mismatch')
          }

          if (figmaEntry && figmaEntry.category) {
            tagSuggestions.push(`category:${figmaEntry.category}`)
          }

          /* Call the tag override hook with our suggestions. */
          const tags = hooks.overrideTags(tagSuggestions, {
            componentName,
            componentCategory,
            entry,
            indexInput,
            figmaData,
            figmaEntry,
          })

          /* Return the modified entry. */
          return { ...entry, tags }
        })
      },
    }),
  )

  return badgedIndexers
}

export { withFigmaSync }
