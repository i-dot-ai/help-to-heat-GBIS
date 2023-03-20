import Layout from '@/components/Layout'
import { GridRow, GridCol, H1 } from 'govuk-react'
import React from 'react'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'

const LocalCouncilSupportPage = () => {
  const router = useRouter()
  return (
    <Layout showBackButton>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>
            You may be eligible for additional household support from your local council
          </H1>

          <GovUK.Paragraph>
            Because you have told us your household income is less than £31,000 and no-one
            in your household receives benefits, your local council may be able to offer
            you more support for home energy.
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            If you unsure who your local council is, you can [find your local
            council](https://www.gov.uk/find-local-council).
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            You can still use this service to check what other home energy measures you
            may be entitled to.
          </GovUK.Paragraph>

          <GovUK.Button
            type="button"
            onClick={() => {
              router.push('/questionnaire?step=9')
            }}
          >
            Continue
          </GovUK.Button>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default LocalCouncilSupportPage
