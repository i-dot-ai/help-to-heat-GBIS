import Layout from '@/components/Layout'
import { QuestionnaireContext } from '@/context/QuestionnaireContext'
import { GridRow, GridCol, H1, Paragraph } from 'govuk-react'
import React, { useContext, useMemo } from 'react'

const IneligibleCountryPage = () => {
  const { data } = useContext(QuestionnaireContext)

  const link = useMemo(() => {
    if (data?.location === 'Northern Ireland') {
      return `You can [find advice on home energy improvements on
            NIDirect](https://www.nidirect.gov.uk/information-and-services/environment-and-outdoors/energy-advice)`
    }
    if (data?.location === 'Scotland') {
      return `You can [find advice and funding on home energy improvements on Home Energy Scotland](https://www.homeenergyscotland.org/funding/)`
    }
    return ''
  }, [data])
  return (
    <Layout showBackButton>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>Sorry, this service isn't for you</H1>
          <Paragraph>
            This service is only for people who own their own home in England and Wales.
          </Paragraph>
          <Paragraph>{link}</Paragraph>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default IneligibleCountryPage
