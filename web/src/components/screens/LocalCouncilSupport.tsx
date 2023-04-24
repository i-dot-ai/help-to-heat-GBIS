import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'
import { Button } from '@/components/ui/Button'

export const LocalCouncilSupport = (props: { onSubmit: () => void }) => {
  const { t } = useTranslation(['screens'])
  return (
    <>
      <GovUK.H1>{t('LocalCouncilSupport.title')}</GovUK.H1>

      <GovUK.Paragraph>
        {t('LocalCouncilSupport.description.a') as string}
      </GovUK.Paragraph>
      <GovUK.Paragraph>
        {t('LocalCouncilSupport.description.b') as string}
      </GovUK.Paragraph>
      <GovUK.Paragraph>
        {t('LocalCouncilSupport.description.c') as string}
      </GovUK.Paragraph>

      <Button
        type="button"
        onClick={() => {
          props.onSubmit()
        }}
      >
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </Button>
    </>
  )
}
