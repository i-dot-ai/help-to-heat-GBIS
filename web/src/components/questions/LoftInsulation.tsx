import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'

import { LoftInsulationType } from '@/types'

type Inputs = {
  loftInsulation: LoftInsulationType
}

const options: {
  label: string
  value: LoftInsulationType
  hint?: string
}[] = [
  {
    label: 'LoftInsulation.option.yes',
    value: 'yes'
  },
  {
    label: 'LoftInsulation.option.no',
    value: 'no'
  },
  {
    label: `LoftInsulation.option.dontKnow`,
    value: `unknown`
  }
]

export const LoftInsulation = (props: {
  onSubmit: (v: LoftInsulationType) => void
  defaultValues?: {
    loftInsulation?: LoftInsulationType
  }
}) => {
  const { t } = useTranslation(['questionnaire'])
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: props.defaultValues
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onSubmit(data.loftInsulation)
  }

  const errorsToShow = Object.keys(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errorsToShow?.length && (
        <GovUK.ErrorSummary
          heading={
            t('error-title', {
              ns: 'common'
            }) as string
          }
          description={
            t('error-message', {
              ns: 'common'
            }) as string
          }
        />
      )}

      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('LoftInsulation.title')}
        </GovUK.Fieldset.Legend>
        <GovUK.Paragraph>{t('LoftInsulation.description.a') as string}</GovUK.Paragraph>

        <GovUK.Details summary={t('LoftInsulation.description')}>
          <GovUK.Paragraph>{t('LoftInsulation.description.b') as string}</GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.loftInsulation?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.loftInsulation?.message && (
              <GovUK.ErrorText>{errors?.loftInsulation.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                value={option.value}
                type="radio"
                {...register('loftInsulation', {
                  required: {
                    value: true,
                    message: t('form-required', {
                      ns: 'common'
                    })
                  }
                })}
              >
                {t(option.label)}
              </GovUK.Radio>
            ))}
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </GovUK.Button>
    </form>
  )
}
