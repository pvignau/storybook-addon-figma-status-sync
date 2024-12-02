import React from 'react'

import { Button } from 'storybook/internal/components'
import { styled } from 'storybook/internal/theming'

import emptyState from '../assets/empty-state.png'

const EmptyState = styled.div`
  min-height: 600px;
  background-image: url(${emptyState});
  background-size: cover;
  align-content: center;
  text-align: center;
  font-weight: 600;

  div {
    background-color: ${({ theme }) => theme.background.content};
    backdrop-filter: blur(2px);
    display: inline-block;
    padding: 1rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: 300;
    margin-block-end: 2rem;
  }
`

/**
 * Error page component displayed when there is an issue loading the component statuses
 * Shows an error message and provides a link to the Figmasync documentation
 * @returns JSX element with error message and documentation link
 */
const ErrorPage = () => {
  return (
    <EmptyState>
      <div>
        <p>No status data found.</p>
        <Button
          onClick={() =>
            window.open(
              'https://github.com/pvignau/storybook-addon-figma-status-sync?tab=readme-ov-file#-usage',
            )
          }
          variant="solid"
          size="medium"
        >
          Enable Figma Integration
        </Button>
      </div>
    </EmptyState>
  )
}

export default ErrorPage
