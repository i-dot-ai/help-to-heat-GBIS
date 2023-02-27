import Layout from '@/components/Layout'
import { GridRow, GridCol, H1 } from 'govuk-react'
import React from 'react'

const YouMayBeEligibleForPage = () => {
  return (
    <Layout showBackButton>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>You may be eligible for...</H1>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default YouMayBeEligibleForPage
