#!/usr/bin/env ts-node

import { describe, it, expect } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Seems that yargs testing is not as easy as I thought.
// Check this later
// TODO: Check yargs testing
// TODO: Mock the Figma API calls

describe('figmasync Binary', () => {
  it('should return expected output for --help', async () => {
    const { stdout, stderr } = await execAsync(
      'node ./dist/figmasync.js --help',
    )
    expect(stderr).toBe('') // No errors
    expect(stdout).toContain('Usage') // Check output contains help message
  })

  it('should fail if required environment variable is missing', async () => {
    const { stderr } = await execAsync(
      'node ./dist/figmasync.js testfile ./output.json',
      {
        env: { ...process.env, FIGMA_PERSONAL_ACCESS_TOKEN: '' },
      },
    )

    expect(stderr).toContain(
      'Error: The FIGMA_PERSONAL_ACCESS_TOKEN environment variable must be set.',
    )
  })

  it('should handle invalid figma file key', async () => {
    const { stderr } = await execAsync(
      'node ./dist/figmasync.js invalidkey output.json',
      {
        env: { ...process.env, FIGMA_PERSONAL_ACCESS_TOKEN: 'test' },
      },
    )

    expect(stderr).toContain('Failed to retrieve Figma file')
  })
})
