import Layout from '@/components/Layout'
import { GridRow, GridCol, Panel, Paragraph } from 'govuk-react'
import React from 'react'

const SuccessPage = () => {
  return (
    <Layout>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <Panel title="Referral successful">
            Your reference number
            <br />
            <strong>HDJ2123F</strong>
          </Panel>

          <Paragraph>
            Your application has been referred successfully. The energy supplier you
            selected will contact you within 14 working days to confirm their process.
          </Paragraph>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default SuccessPage
