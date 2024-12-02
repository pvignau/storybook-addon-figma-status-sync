import React, { useMemo } from 'react'

import type { FigmaComponentStatus } from '../types'
import { getFigmaSyncData } from '../utils/getFigmaSyncData'
import { sortByProperty } from '../utils/sortByProperty'

import ErrorPage from './ErrorPage'
import List from './List'
import Legend from './Legend'

/**
 * Main page component for displaying the component statuses
 * @returns JSX element containing the main page content
 */
const StatusPage = () => {
  const components: FigmaComponentStatus[] = useMemo(
    () =>
      getFigmaSyncData()
        .map((item: FigmaComponentStatus) => {
          return {
            ...item,
            // TODO: if version different from local index version, force status type to CHANGED.
          }
        })
        .sort(sortByProperty('category')),
    [],
  )

  return (
    <>
      <h1>Component Status</h1>
      {components.length === 0 ? (
        <ErrorPage />
      ) : (
        <>
          <List components={components} />
          <Legend />
        </>
      )}
    </>
  )
}

export default StatusPage
