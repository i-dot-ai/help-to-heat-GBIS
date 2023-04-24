import React, { useMemo } from 'react'
import * as GovUK from 'govuk-react'
import { LocationType } from '@/types'
import { useTranslation } from 'next-i18next'

export const IneligibleCountry = ({ location }: { location: LocationType }) => {
  const { t } = useTranslation('screens')
  const [title, description, link] = useMemo(() => {
    if (location === 'Scotland') {
      return [
        t('IneligibleCountry.title.scotland'),
        t('IneligibleCountry.description.scotland'),
        t('IneligibleCountry.link.scotland')
      ]
    }
    if (location === 'Northern Ireland') {
      return [
        t('IneligibleCountry.title.ni'),
        t('IneligibleCountry.description.ni'),
        t('IneligibleCountry.link.ni')
      ]
    }
    return [
      t('IneligibleCountry.title'),
      t('IneligibleCountry.description'),
      t('IneligibleCountry.link') as string
    ]
  }, [location, t])

  return (
    <div>
      <GovUK.H1>{title}</GovUK.H1>
      <GovUK.Paragraph>{description}</GovUK.Paragraph>
      <GovUK.Paragraph>{link}</GovUK.Paragraph>
    </div>
  )
}
