import Questionnaire from '@/components/Questionnaire'
import Layout from '@/components/Layout'
import * as GovUK from 'govuk-react'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { State, StateFrom } from 'xstate'
import { questionnaireMachine } from '@/questionnaireMachine'

const QuestionnairePage = () => {
  const [loading, setLoading] = useState(true)
  const [initialState, setInitialState] =
    useState<StateFrom<typeof questionnaireMachine>>()

  useEffect(() => {
    if (!loading) {
      return
    }
    const storedState = localStorage.getItem('qs')
    if (storedState) {
      const rehydratedState = State.create(JSON.parse(storedState))
      setInitialState(rehydratedState as StateFrom<typeof questionnaireMachine>)
    }

    setLoading(false)
  }, [loading, setInitialState])

  if (loading) return null

  return (
    <Layout>
      <GovUK.GridRow>
        <GovUK.GridCol setWidth="two-thirds">
          <Questionnaire initialState={initialState} />
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
