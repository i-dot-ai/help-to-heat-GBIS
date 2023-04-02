import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'

import { WallInsulationType } from '@/types'

type Inputs = {
  wallInsulation: WallInsulationType
}

const options: {
  label: string
  value: WallInsulationType
  hint?: string
}[] = [
  {
    label: 'WallInsulation.option.all',
    value: 'all'
  },
  {
    label: 'WallInsulation.option.some',
    value: 'some'
  },
  {
    label: 'WallInsulation.option.none',
    value: 'none'
  },
  {
    label: `WallInsulation.option.unknown`,
    value: `unknown`
  }
]

export const WallInsulation = (props: {
  onSubmit: (v: WallInsulationType) => void
  defaultValues?: {
    wallInsulation?: WallInsulationType
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
    props.onSubmit(data.wallInsulation)
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
          {t('WallInsulation.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Paragraph>{t('WallInsulation.description.a') as string}</GovUK.Paragraph>
        <GovUK.Paragraph>{t('WallInsulation.description.b') as string}</GovUK.Paragraph>
        <GovUK.Details summary={t('WallInsulation.description')}>
          <GovUK.Paragraph>{t('WallInsulation.description.c') as string}</GovUK.Paragraph>
          <GovUK.Paragraph>{t('WallInsulation.description.d') as string}</GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.wallInsulation?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.wallInsulation?.message && (
              <GovUK.ErrorText>{errors?.wallInsulation.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                value={option.value}
                type="radio"
                {...register('wallInsulation', {
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
