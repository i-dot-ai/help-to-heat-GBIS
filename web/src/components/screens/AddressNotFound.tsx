import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'

export const AddressNotFound = () => {
  const { t } = useTranslation(['screens'])
  return (
    <>
      <GovUK.H1>{t('AddressNotFound.title')}</GovUK.H1>
      <GovUK.Paragraph>{t('AddressNotFound.description') as string}</GovUK.Paragraph>
    </>
  )
}
