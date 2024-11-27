import { test as base } from 'vitest'

import { withFigmaSyncTags } from '../withFigmaSyncTags'
import type {
  Indexer,
  IndexInput,
  IndexerOptions,
} from 'storybook/internal/types'
import type { FigmaComponentStatus } from '../types'

interface FigmaSyncTagsFixtures {
  figmaData: FigmaComponentStatus[]
  createMockIndexer: (storyData: Record<string, unknown>) => Indexer
  indexerOptions: IndexerOptions
}
const it = base.extend<FigmaSyncTagsFixtures>({
  figmaData: async ({}, use) => {
    await use([
      {
        name: 'Button',
        category: 'Components',
        version: '1.0.0',
        isDeprecated: false,
        devStatus: { type: 'stable', description: null },
      },
      {
        name: 'Header',
        category: 'Components',
        version: '2.0.0',
        isDeprecated: true,
        devStatus: { type: 'deprecated', description: 'Use NewHeader instead' },
      },
      {
        name: 'Card',
        category: 'Components',
        version: '1.1.0',
        isDeprecated: false,
        devStatus: { type: 'beta', description: null },
      },
    ])
  },
  createMockIndexer: async ({}, use) => {
    await use(
      (storyData: IndexInput): Indexer => ({
        test: /\.stories\.[tj]sx?$/,
        createIndex: async () => [storyData],
      }),
    )
  },
  indexerOptions: async ({}, use) => {
    await use({
      makeTitle: (userTitle: string) => userTitle,
    })
  },
})

describe('withFigmaSyncTags', () => {
  describe('extractComponentName', () => {
    it('does not inject a code-only badge to components that match a Figma status entry', async ({
      figmaData,
      createMockIndexer,
      indexerOptions,
    }) => {
      const mockIndexer = createMockIndexer({
        type: 'story',
        importPath: 'src/components/Button.stories.ts',
      })

      const result = await withFigmaSyncTags([mockIndexer], figmaData)
      const output = await result[0].createIndex('', indexerOptions)
      expect(output[0].tags).not.toContain('code-only')
    })

    it('injects a code-only badge to components not found in the Figma status data', async ({
      figmaData,
      createMockIndexer,
      indexerOptions,
    }) => {
      const mockIndexer = createMockIndexer({
        type: 'story',
        importPath: 'src/components/Dashboard.stories.ts',
      })

      const result = await withFigmaSyncTags([mockIndexer], figmaData)
      const output = await result[0].createIndex('', indexerOptions)
      expect(output[0].tags).toContain('code-only')
    })

    // it('handles complex import paths', async ({
    //   figmaData,
    //   createMockIndexer,
    // }) => {
    //   const mockIndexer = createMockIndexer({
    //     type: 'story',
    //     importPath: 'src/components/nested/deep/Button.stories.tsx',
    //   })

    //   const result = await withFigmaSyncTags([mockIndexer], figmaData)
    //   const output = await result[0].createIndex('', '')
    //   expect(output[0].tags).not.toContain('tech-only')
    // })
  })

  // describe('outside-ds components', () => {
  //   it('preserves outside-ds tags without modification', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: 'src/components/Custom.stories.ts',
  //       tags: ['outside-ds'],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0].tags).toEqual(['outside-ds'])
  //   })
  // })

  // describe('tech-only components', () => {
  //   it('adds tech-only tag for components not in Figma', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: 'src/components/Unknown.stories.ts',
  //       tags: [],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0].tags).toContain('tech-only')
  //   })
  // })

  // describe('version handling', () => {
  //   it('adds experimental tag when no version tag exists', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: 'src/components/Button.stories.ts',
  //       tags: [],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0].tags).toContain('experimental')
  //   })

  //   it('handles version mismatch', async ({ figmaData, createMockIndexer }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: 'src/components/Button.stories.ts',
  //       tags: ['v:0.9.0'],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0].tags).toContain('version-mismatch')
  //     expect(output[0].tags).toContain('needs-revision')
  //   })

  //   it('handles matching versions correctly', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: 'src/components/Button.stories.ts',
  //       tags: ['v:1.0.0'],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0].tags).not.toContain('version-mismatch')
  //     expect(output[0].tags).not.toContain('needs-revision')
  //   })
  // })

  // describe('deprecated components', () => {
  //   it('adds deprecated tag for deprecated Figma components', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: 'src/components/Header.stories.ts',
  //       tags: ['v:2.0.0'],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0].tags).toContain('deprecated')
  //   })
  // })

  // describe('error handling', () => {
  //   it('throws error for nameless story files', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'story',
  //       importPath: '.stories.ts',
  //       tags: [],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     await expect(result[0].createIndex('', '')).rejects.toThrow(
  //       'Nameless story file found',
  //     )
  //   })

  //   it('handles non-story type entries', async ({
  //     figmaData,
  //     createMockIndexer,
  //   }) => {
  //     const mockIndexer = createMockIndexer({
  //       type: 'not-story',
  //       importPath: 'src/components/Button.stories.ts',
  //       tags: [],
  //     })

  //     const result = await withFigmaSyncTags([mockIndexer], figmaData)
  //     const output = await result[0].createIndex('', '')
  //     expect(output[0]).toEqual({
  //       type: 'not-story',
  //       importPath: 'src/components/Button.stories.ts',
  //       tags: [],
  //     })
  //   })
  // })
})
