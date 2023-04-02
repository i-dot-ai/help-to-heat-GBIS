import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'

export const PropertyIneligible = () => {
  const { t } = useTranslation(['screens'])
  return <GovUK.H1>{t('PropertyIneligible.title')}</GovUK.H1>
}
