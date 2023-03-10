import Layout from '@/components/Layout'
import { GridCol, GridRow, H1, Paragraph } from 'govuk-react'
import React from 'react'

const NonEpcGasGridPage = () => {
  return (
    <Layout showBackButton>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>EPC & gas grid unhappy path</H1>
          <Paragraph>
            Placeholder screen for unhappy path whereby EPC cannot be found and user is
            off gas grid (policy rule TBC)
          </Paragraph>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default NonEpcGasGridPage
