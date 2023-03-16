import Layout from '@/components/Layout'
import { GridRow, GridCol, H1 } from 'govuk-react'
import React from 'react'

const PostCodeNotFoundPage = () => {
  return (
    <Layout showBackButton customBackUrl="/questionnaire?step=3">
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>Postcode not found</H1>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default PostCodeNotFoundPage
