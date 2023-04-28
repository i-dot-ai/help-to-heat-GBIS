import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'

export const PropertyIneligible = () => {
  const { t } = useTranslation(['screens'])
  return (
    <div
      style={{
        marginTop: '24px'
      }}
    >
      <GovUK.Heading size="L">{t('PropertyIneligible.title')}</GovUK.Heading>
      <GovUK.Paragraph>{t('PropertyIneligible.description') as string}</GovUK.Paragraph>
      <GovUK.Heading size="MEDIUM">{t('PropertyIneligible.subTitle')}</GovUK.Heading>
      <GovUK.Paragraph>
        {t('PropertyIneligible.descriptionBody1') as string}
      </GovUK.Paragraph>
      <GovUK.Paragraph>
        {t('PropertyIneligible.descriptionBody2') as string}
      </GovUK.Paragraph>
    </div>
  )
}
