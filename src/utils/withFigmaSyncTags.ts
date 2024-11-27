import type { Indexer, StoryIndexInput } from 'storybook/internal/types'

import type { FigmaComponentStatus } from '../types'

/**
 * Extracts the component name from the import path.
 * @param {StoryIndexInput} input - The input object containing the import path
 * @returns {string | null} - The extracted component name or null if it couldn't be extracted
 */
function extractComponentName({ importPath }: StoryIndexInput): string | null {
  return importPath
    .split('/')
    .pop()
    .replace(/\.stories\.[a-z]+$/, '')
}

/**
 * Finds the Figma entry for a given Storybook name
 * @param {string} sbName - The Storybook name to search for
 * @returns {FigmaComponentStatus | null} - The Figma component status or null if it couldn't be found
 */
function findFigmaEntry(
  figmaData: FigmaComponentStatus[],
  sbName: string,
): FigmaComponentStatus | null {
  return figmaData.find(({ name }) => name === sbName) ?? null
}

/**
 * Finds the version tag in a list of tags
 * @param {string[]} tags - The list of tags to search in
 * @returns {string | null} - The version tag or null if it couldn't be found
 */
function findVersionTag(tags: string[]): string | null {
  return tags.find((tag) => tag.match(/v:.*/))?.replace(/^v:/, '') ?? null
}

/**
 * Makes tags for a component
 * @param {string[]} tags - The existing tags
 * @param {string[]} additions - The additional tags to add
 * @param {boolean} isDeprecated - Whether the component is deprecated
 * @returns {string[]} - The new list of tags
 */
function makeTags(
  tags: string[],
  additions: string[],
  isDeprecated: boolean,
): string[] {
  const ret = [...tags, ...additions]
  if (isDeprecated) {
    ret.push('deprecated')
  }
  return ret
}

/**
 * Injects badges to stories
 * @param {Indexer[]} existingIndexers - The existing indexers
 * @returns {Indexer[]} - The new indexers with badges injected
 */
const withFigmaSyncTags = (
  existingIndexers: Indexer[],
  figmaData: FigmaComponentStatus[],
): Indexer[] => {
  const badgedIndexers = existingIndexers.map(
    (indexer: Indexer): Indexer => ({
      test: indexer.test,
      async createIndex(...args) {
        const existingOutput = await indexer.createIndex(...args)

        return existingOutput.map((entry) => {
          const { tags = [] } = entry
          /* Only consider components that exist in the DS.
           * For outside-DS components, do nothing. */
          if (tags.includes('outside-ds')) {
            return entry
          }

          /* Type sanitization, in practice they're always stories. */
          if (entry.type !== 'story') {
            return entry
          }

          const componentName = extractComponentName(entry)
          if (!componentName) {
            throw new Error(
              `Nameless story file found; this file cannot be mapped to a Figma component. Please file a bug report with a minimal working example, knowing this is likely a problem with your Storybook content.\nFaulty entry:\n${JSON.stringify(entry, null, 2)}\n`,
            )
          }

          const figma = findFigmaEntry(figmaData, componentName)

          /* Figma name not found, assume the component only exists on the code side of things. */
          if (!figma) {
            return {
              ...entry,
              tags: makeTags(tags, ['code-only'], false),
            }
          }

          const localVersion = findVersionTag(tags)

          /* Local version could not be found, assume the component is still in progress. */
          if (!localVersion) {
            return {
              ...entry,
              tags: makeTags(tags, ['experimental'], figma.isDeprecated),
            }
          }

          /* If version mismatch, we must warn our end users that they're late compared to Figma. */
          if (localVersion !== figma.version) {
            const local = localVersion.split('.')
            const remote = figma.version.split('.')

            const revisionTags = ['version-mismatch']
            if (
              local[0] < remote[0] ||
              (local[0] === remote[0] && local[1] < remote[1]) ||
              (local[0] === remote[0] &&
                local[1] === remote[1] &&
                local[2] < remote[2])
            ) {
              revisionTags.push('needs-revision')
            }

            return {
              ...entry,
              tags: makeTags(tags, revisionTags, figma.isDeprecated),
            }
          }

          return {
            ...entry,
            tags: makeTags(tags, [], figma.isDeprecated),
          }
        })
      },
    }),
  )

  return badgedIndexers
}

export { withFigmaSyncTags }
