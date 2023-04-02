import React, { useMemo } from 'react'
import * as GovUK from 'govuk-react'
import { LocationType } from '@/types'
import { useTranslation } from 'next-i18next'

export const IneligibleCountry = ({ location }: { location: LocationType }) => {
  const { t } = useTranslation(['screens'])
  const link = useMemo(() => {
    if (location === 'Northern Ireland') {
      return t('IneligibleCountry.link.ni')
    }
    if (location === 'Scotland') {
      return t('IneligibleCountry.link.scotland')
    }
    return ''
  }, [location, t])

  return (
    <>
      <GovUK.H1>{t('IneligibleCountry.title')}</GovUK.H1>
      <GovUK.Paragraph>{t('IneligibleCountry.description') as string}</GovUK.Paragraph>
      <GovUK.Paragraph>{link}</GovUK.Paragraph>
    </>
  )
}
