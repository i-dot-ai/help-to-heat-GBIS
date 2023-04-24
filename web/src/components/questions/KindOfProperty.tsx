import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { PropertyType } from '@/types'
import { Button } from '@/components/ui/Button'

type Inputs = {
  property: PropertyType
}

const options: {
  label: string
  value: PropertyType
  hint?: string
}[] = [
  {
    label: 'KindOfProperty.option.house',
    value: 'house'
  },
  {
    label: 'KindOfProperty.option.bungalow',
    value: 'bungalow'
  },
  {
    label: 'KindOfProperty.option.apartment',
    value: 'apartment'
  }
]

export const KindOfProperty = (props: {
  onSubmit: (v: PropertyType) => void
  defaultValues?: {
    property?: PropertyType
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
    props.onSubmit(data.property)
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
          {t('KindOfProperty.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Details
          summary={
            t('why-do-we-ask', {
              ns: 'common'
            }) as string
          }
        >
          <GovUK.Paragraph>{t('KindOfProperty.description.a') as string}</GovUK.Paragraph>
          <GovUK.Paragraph>{t('KindOfProperty.description.b') as string}</GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.property?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.property?.message && (
              <GovUK.ErrorText>{errors?.property.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('property', {
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

      <Button type="submit">
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </Button>
    </form>
  )
}
