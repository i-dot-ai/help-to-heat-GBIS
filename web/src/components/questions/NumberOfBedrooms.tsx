import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { Button } from '@/components/ui/Button'

import { NumberOfBedroomsType } from '@/types'

type Inputs = {
  numberOfBedrooms: NumberOfBedroomsType
}

const options: {
  label: string
  value: NumberOfBedroomsType
  hint?: string
}[] = [
  {
    label: 'NumberOfBedrooms.option.studio',
    value: 'studio'
  },
  {
    label: 'NumberOfBedrooms.option.one-bedroom',
    value: '1'
  },
  {
    label: 'NumberOfBedrooms.option.two-bedrooms',
    value: '2'
  },
  {
    label: 'NumberOfBedrooms.option.three-bedrooms',
    value: '3+'
  }
]

export const NumberOfBedrooms = (props: {
  onSubmit: (v: NumberOfBedroomsType) => void
  defaultValues?: {
    numberOfBedrooms?: NumberOfBedroomsType
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
    props.onSubmit(data.numberOfBedrooms)
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
          {t('NumberOfBedrooms.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.numberOfBedrooms?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.numberOfBedrooms?.message && (
              <GovUK.ErrorText>{errors?.numberOfBedrooms.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                value={option.value}
                type="radio"
                {...register('numberOfBedrooms', {
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
