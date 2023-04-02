import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'

export const ListOfElegibleSchemes = (props: { onSubmit: () => void }) => {
  const { t } = useTranslation(['screens'])
  return (
    <div>
      <h1>{t('ListOfElegibleSchemes.title')}</h1>
      <GovUK.Button
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
      </GovUK.Button>
    </div>
  )
}
