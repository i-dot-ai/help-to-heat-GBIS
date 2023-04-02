import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'

export const Success = (props: { referenceNumber: string }) => {
  const { t } = useTranslation(['screens'])
  return (
    <>
      <GovUK.Panel title={t('Success.header')}>
        {t('Success.title')}
        <br />
        <strong>{props.referenceNumber}</strong>
      </GovUK.Panel>

      <GovUK.Paragraph>{t('Success.description') as string}</GovUK.Paragraph>
    </>
  )
}
