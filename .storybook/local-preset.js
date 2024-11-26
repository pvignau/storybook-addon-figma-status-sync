import { experimental_indexers, managerHead } from "../src/preset";

/**
 * to load the built addon in this test Storybook
 */
function previewAnnotations(entry = []) {
  return [...entry, require.resolve("../dist/preview.js")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("../dist/manager.js")];
}

module.exports = {
  experimental_indexers,
  managerHead,
  managerEntries,
  previewAnnotations,
};
