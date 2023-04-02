import React from 'react'
import { useTranslation } from 'next-i18next'
import * as GovUK from 'govuk-react'

export const ConfirmAndSubmit = (props: { onSubmit: () => void }) => {
  const { t } = useTranslation(['questionnaire'])
  return (
    <>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('ConfirmAndSubmit.title')}
        </GovUK.Fieldset.Legend>
      </GovUK.Fieldset>

      <GovUK.Button
        type="button"
        onClick={() => {
          props.onSubmit()
        }}
      >
        {t('continue', {
          ns: 'common'
        })}
      </GovUK.Button>
    </>
  )
}
