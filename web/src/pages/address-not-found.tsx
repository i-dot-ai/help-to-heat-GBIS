import Layout from '@/components/Layout'
import { GridRow, GridCol, H1, Paragraph } from 'govuk-react'
import React from 'react'

const AddressNotFoundPage = () => {
  return (
    <Layout showBackButton customBackUrl="/questionnaire?step=3">
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>Your address cannot be found</H1>
          <Paragraph>
            This may be because your property is new or your post code was entered
            incorrectly.
          </Paragraph>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default AddressNotFoundPage
