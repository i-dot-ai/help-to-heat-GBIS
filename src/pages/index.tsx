import { Page, Button, H2, Paragraph } from 'govuk-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/questionnaire')
  }, [router])
  return (
    <Page>
      <H2>Governmental Energy Grants Eligibility Survey</H2>
      <Paragraph>
        We appreciate your participation in this survey, which will help us determine your
        eligibility for government energy grants.
      </Paragraph>
      <Paragraph>
        The survey will only take a few minutes to complete and all responses are
        confidential. Let's get started!
      </Paragraph>
      <Button
        start
        onClick={() => {
          router.push('/questionnaire?step=1')
        }}
      >
        Start now
      </Button>
    </Page>
  )
}

export default NextPage
