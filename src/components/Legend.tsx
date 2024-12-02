import React from 'react'

import {
  getAriaLabel,
  getImage,
  getKeys,
  getLegend,
} from '../utils/componentStatus'
import { useTheme } from 'storybook/internal/theming'

/**
 * Renders the legend for dev status icons.
 * @returns A HTML details element with the legend inside.
 */
const Legend = () => {
  const theme = useTheme()

  return (
    <details style={{ color: theme.color.defaultText }}>
      <summary style={{ cursor: 'pointer' }}>Legend</summary>
      <ul style={{ listStyle: 'none' }}>
        {getKeys().map((k) => (
          <li
            key={k}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBlockEnd: '.5rem',
            }}
          >
            <span
              style={{
                minWidth: '7rem',
                fontWeight: 'bold',
                textAlign: 'right',
              }}
            >
              {getAriaLabel(k)}
            </span>
            <img
              src={getImage(k)}
              aria-hidden
              height="24"
              style={{ marginInlineEnd: '.5rem' }}
            />
            <span>{getLegend(k)}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default Legend
