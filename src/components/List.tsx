import React from 'react'

import { styled } from 'storybook/internal/theming'

import type { FigmaComponentStatus } from '../types'
import { getAriaLabel, getImage } from '../utils/componentStatus'
import { sortByProperty } from '../utils/sortByProperty'

const Table = styled.table`
  width: 100%;
  margin-block-end: 2rem;
  display: grid;
  grid-template-columns: minmax(12rem, auto) minmax(5rem, auto) 1fr;

  thead,
  tbody,
  tr {
    display: contents;
  }

  th,
  td {
    display: inline-flex;
  }
`

/**
 * Renders a list of components grouped by category in a table format
 * @param components - Array of FigmaComponentStatus objects to display
 * @returns JSX element containing tables of components grouped by category
 */
const List = ({ components }: { components: FigmaComponentStatus[] }) => {
  return components.reduce((acc: JSX.Element[], component, index) => {
    if (index === 0 || components[index - 1].category !== component.category) {
      // Get all components for this category
      const categoryComponents = components
        .filter((c) => c.category === component.category)
        .sort(sortByProperty('name'))

      // Push both the header and its corresponding table
      acc.push(
        <div key={`section-${component.category}`}>
          <h2>{component.category}</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Figma dev status</th>
              </tr>
            </thead>
            <tbody>
              {categoryComponents.map((comp) => (
                <tr key={comp.name}>
                  <td>
                    <strong>{comp.name}</strong>
                  </td>
                  <td>{comp.version}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '.75rem' }}>
                      <img
                        alt={getAriaLabel(comp.devStatus?.type)}
                        src={getImage(comp.devStatus?.type)}
                        title={getAriaLabel(comp.devStatus?.type)}
                        height="24"
                      />
                      <span>{comp.devStatus?.description ?? ''}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>,
      )
    }
    return acc
  }, [])
}

export default List
