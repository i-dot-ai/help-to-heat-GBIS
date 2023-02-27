import Layout from '@/components/Layout'
import { GridRow, GridCol, H1 } from 'govuk-react'
import React from 'react'

const PropertyIneligiblePage = () => {
  return (
    <Layout showBackButton>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>This property does not qualify for measures</H1>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default PropertyIneligiblePage
