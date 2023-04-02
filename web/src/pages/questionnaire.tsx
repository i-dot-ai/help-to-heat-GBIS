import Questionnaire from '@/components/Questionnaire'
import Layout from '@/components/Layout'
import * as GovUK from 'govuk-react'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const QuestionnairePage = () => {
  return (
    <Layout>
      <GovUK.GridRow>
        <GovUK.GridCol setWidth="two-thirds">
          <Questionnaire />
        </GovUK.GridCol>
        <GovUK.GridCol setWidth="one-third"></GovUK.GridCol>
      </GovUK.GridRow>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', [
    'common',
    'questionnaire',
    'screens'
  ])

  return {
    props: {
      ...translations
    }
  }
}

export default QuestionnairePage
