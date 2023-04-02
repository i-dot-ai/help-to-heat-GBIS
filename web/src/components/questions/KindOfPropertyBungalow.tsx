import React, { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { BungalowType } from '@/types'

type Inputs = {
  bungalow: BungalowType
}

const options: {
  label: string
  value: BungalowType
  hint?: string
}[] = [
  {
    label: 'KindOfPropertyBungalow.option.detached',
    value: 'detached',
    hint: 'KindOfPropertyBungalow.option.detached.hint'
  },
  {
    label: 'KindOfPropertyBungalow.option.semiDetached',
    value: 'semi-detached',
    hint: 'KindOfPropertyBungalow.option.semiDetached.hint'
  },
  {
    label: 'KindOfPropertyBungalow.option.terraced',
    value: 'terraced',
    hint: 'KindOfPropertyBungalow.option.terraced.hint'
  },
  {
    label: 'KindOfPropertyBungalow.option.endTerraced',
    value: 'end-terrace',
    hint: 'KindOfPropertyBungalow.option.endTerraced.hint'
  }
]

export const KindOfPropertyBungalow = (props: {
  onSubmit: (v: BungalowType) => void
  defaultValues?: {
    bungalow?: BungalowType
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
    props.onSubmit(data.bungalow)
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
          {t('KindOfPropertyBungalow.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Details
          summary={
            t('why-do-we-ask', {
              ns: 'common'
            }) as string
          }
        >
          <GovUK.Paragraph>
            {t('KindOfPropertyBungalow.description.a') as string}
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            {t('KindOfPropertyBungalow.description.b') as string}
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.bungalow?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.bungalow?.message && (
              <GovUK.ErrorText>{errors?.bungalow.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint && t(option.hint)}
                value={option.value}
                type="radio"
                {...register('bungalow', {
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
