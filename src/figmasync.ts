import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import yargs from 'yargs';

import type { CanvasNode, DevStatusTrait, DocumentNode, Node } from '@figma/rest-api-spec'
import type { FigmaComponentStatus } from './types.ts';
import { Client } from '@figmarine/rest';
import { visit } from 'unist-util-visit';
import { InstanceNode } from '@figmarine/rest/dist/index.js';

/// /////////////////////////////////////////////////////////////////////
/// /////////////   General constants and singletons.    ////////////////
/// /////////////////////////////////////////////////////////////////////

interface Arguments {
  figmaFileKey: string;
  output: string;
}

const dirname = process.cwd();
const FIGMA_META_NODE_NAME = '_meta';
const FIGMA_META_NODE_PROPS = {
  category: 'category',
  version: 'version',
  name: 'name',
  isDeprecated: 'isDeprecated'
};
const FIGMA_NODE_INSTANCE_TYPE = 'INSTANCE';
const FIGMA_NODE_TYPES_TO_CONSIDER = [
  'COMPONENT',
  'COMPONENT_SET',
  'SECTION',
  FIGMA_NODE_INSTANCE_TYPE
];

/// /////////////////////////////////////////////////////////////////////
/// /////////////           Utility functions.           ////////////////
/// /////////////////////////////////////////////////////////////////////

/**
 * Checks the environment configuration for required variables.
 *
 * @param {Object} args - The arguments object.
 */
function checkEnv() {
  if (!process.env.FIGMA_PERSONAL_ACCESS_TOKEN) {
    process.stderr.write(
      `Error: The FIGMA_PERSONAL_ACCESS_TOKEN environment variable must be set.\n`,
    );
    process.exit(1);
  }
}

/**
 * Retrieves the Figma file from the Figma API.
 *
 * @returns {DocumentNode} - The Figma file object.
 */
async function getFigmaFile(figmaFileKey: string) : Promise<DocumentNode> {
  // CLIENT INITIALIZATION
  const c = await Client({
    mode: process.env.PRODUCTION ? 'production' : 'development',
    personalAccessToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN
  });

  const response = await c.v1.getFile(figmaFileKey)
  if (response.status !== 200) {
    throw new Error(`Failed to retrieve Figma file: ${response.statusText}`);
  }

  return response.data.document as DocumentNode;
}

/**
 * Extracts the file pages from a Figma file.
 *
 * @param {DocumentNode} file - The Figma file object.
 * @returns {Array} - The file pages.
 */
function getFilePages(file: DocumentNode): CanvasNode[] {
  return file.children.filter(
    // Ignore pages that are not canvases and empty names
    (child: any) => child.type === 'CANVAS' && child.name.trim() !== ''
  )
}

/**
 * Extracts a property value from a component's properties.
 *
 * @param {Object} componentProperties - The component properties.
 * @param {string} propertyName - The property name.
 * @returns {string|undefined} - The property value or undefined if not found.
 */
function getPropertyValue(componentProperties: { [KEY: string]: { value: string } }, propertyName: string): string | undefined {
  const fullPropertyKey = Object.keys(componentProperties).find((key) =>
    key.startsWith(propertyName)
  );

  return (fullPropertyKey && fullPropertyKey in componentProperties ) ? componentProperties[fullPropertyKey].value : undefined;
}

/**
 * Extracts the development status of a component.
 *
 * @param {Object} component - The component object.
 * @returns {Object|null} - The development status or null if not found.
 */
function getComponentDevStatus(component: FigmaComponentStatus): { type: string; description: string | null } | null {
  if (component.devStatus) {
    const { type, description } = component.devStatus;

    return { type, description: description ? description.trim() : null };
  }

  return null;
}

/**
 * Extracts component statuses from Figma file pages.
 *
 * @param {Array} pages - The Figma file pages.
 * @returns {Object} - A dictionary of components with their statuses.
 */
function getComponentStatusesFromFilePages(pages: CanvasNode[]): { [KEY: string]: FigmaComponentStatus } {
  const components: {
    [KEY: string]: {
      meta: InstanceNode | null;
      devStatus: DevStatusTrait | null;
    };
  } = {};

  for (const page of pages) {
    components[page.name]= { meta: null, devStatus: null };

    visit(page, (node: Node, i, parent: Node) => {
      if (node.name === FIGMA_META_NODE_NAME && node.type === FIGMA_NODE_INSTANCE_TYPE) {
        components[page.name].meta = node as InstanceNode;
      }
      if (FIGMA_NODE_TYPES_TO_CONSIDER.includes(node.type)) {
        if ('devStatus' in node) {
          components[page.name].devStatus = node.devStatus as DevStatusTrait;
        } else if ('devStatus' in parent) {
          components[page.name].devStatus = parent.devStatus as DevStatusTrait;
        }
      }
    });
  }

  return Object.entries(components).reduce(
    (
      acc: { [KEY: string]: FigmaComponentStatus }, 
      [key, component]: [string, { meta: InstanceNode, devStatus: DevStatusTrait }]
    ) => {
    if ('meta' in component && component.meta !== null) {
      const { componentProperties } = component.meta;
      acc[key] = {
        name: getPropertyValue(componentProperties, FIGMA_META_NODE_PROPS.name) || key,
        category: getPropertyValue(componentProperties, FIGMA_META_NODE_PROPS.category),
        version: getPropertyValue(componentProperties, FIGMA_META_NODE_PROPS.version),
        devStatus: getComponentDevStatus(component as any),
        isDeprecated: getPropertyValue(componentProperties, FIGMA_META_NODE_PROPS.isDeprecated) === 'true'
      };
    }

    return acc;
  }, {});
}

/**
 * Writes the component statuses to a JSON file for a given target.
 *
 * @param {string} target - The target name.
 * @param {Array} components - The component statuses.
 */
function writeTargetComponentStatus(components: any, filepath: string) {
    fs.writeFileSync(filepath, JSON.stringify(components));
}
/**
 * Synchronizes component statuses from a Figma file and writes them to a JSON file.
 * This function retrieves the Figma file pages, extracts component statuses, and writes them to a specified output file.
 * 
 * @param {Arguments} args - The arguments object containing the Figma file key and the output file path.
 */
async function synchronizeComponentStatuses(args: Arguments) {
    // MAIN PROCESSING
    // Convert relative filepath to absolute path if needed
    const absolutePath = path.isAbsolute(args.output) ? args.output : path.join(dirname, args.output);
    process.stdout.write(`Updating component status\nRetrieving file pages\n`);
    const file = await getFigmaFile(args.figmaFileKey);
    const componentPages = getFilePages(file);
    process.stdout.write(`Extracting component statuses\n`);
    const components = Object.values(getComponentStatusesFromFilePages(componentPages));
    process.stdout.write(`Writing component statuses to ${absolutePath}\n`);
    writeTargetComponentStatus(components, absolutePath);
    process.stdout.write(`Done\n`);
}

/// /////////////////////////////////////////////////////////////////////
/// /////////////               Main function.               ////////////
/// /////////////////////////////////////////////////////////////////////

async function main() {
  try {
    // ARG HANDLING
    process.stdout.write(chalk.bold.blueBright('Figmasync - Figma components status sync tool\n'));

    checkEnv();
    await yargs(process.argv.slice(2))
      .scriptName('figmasync')
      .usage('Usage: $0 sync <figma-file-key> <output>')
      .command(
        '$0 sync <figma-file-key> <output>',
        '',
        (y: yargs.Argv<Arguments>) => {
          return y.positional('figma-file-key', {
            type: 'string',
            describe: 'The Figma file key',
          }).demandOption('figma-file-key')
            .positional('output', {
              type: 'string',
              describe: 'The json file to write output',
            }).demandOption('output')
        },
        synchronizeComponentStatuses,
      )
      .help()
      .parse();

  } catch (error) {
    process.stderr.write(`Error while processing: ${error.message}\n`);
  }
}

main();