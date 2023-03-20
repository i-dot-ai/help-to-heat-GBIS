import Layout from '@/components/Layout'
import { Button, GridCol, GridRow, H1 } from 'govuk-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/questionnaire')
  }, [router])
  return (
    <Layout>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1 size={'L'}>Get home energy improvements</H1>

          <Button
            start
            onClick={() => {
              router.push('/questionnaire?step=1')
            }}
          >
            Start now
          </Button>
        </GridCol>
        <GridCol setWidth="one-third"></GridCol>
      </GridRow>
    </Layout>
  )
}

export default NextPage
