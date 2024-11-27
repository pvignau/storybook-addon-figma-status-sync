export const imageMap = {
  CHANGED: '/glx/dev-mode-changed.png',
  COMPLETED: '/glx/dev-mode-completed.png',
  READY_FOR_DEV: '/glx/dev-mode-ready-for-dev.png',
  NOT_READY: '/glx/dev-mode-not-ready.png',
  'N/A': '/glx/dev-mode-no-data.png',
}

export const ariaLabelMap = {
  COMPLETED: 'Completed',
  READY_FOR_DEV: 'Ready for dev',
  CHANGED: 'Changed',
  NOT_READY: 'Not ready',
  'N/A': 'Unknown',
}

export const legendMap = {
  COMPLETED: 'The coded component is on-par with the one in Figma.',
  READY_FOR_DEV: 'The Figma component is ready for initial development.',
  CHANGED:
    'The Figma component has changes that need to be implemented in code.',
  NOT_READY: 'The component is not yet ready for development.',
  'N/A': "Data is missing on this component's status in Figma.",
}
