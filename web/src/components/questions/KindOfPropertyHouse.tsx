import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { HouseType } from '@/types'

type Inputs = {
  house: HouseType
}

const options: {
  label: string
  value: HouseType
  hint?: string
}[] = [
  {
    label: 'KindOfPropertyHouse.option.detached',
    value: 'detached',
    hint: 'KindOfPropertyHouse.option.detached.hint'
  },
  {
    label: 'KindOfPropertyHouse.option.semiDetached',
    value: 'semi-detached',
    hint: 'KindOfPropertyHouse.option.semiDetached.hint'
  },
  {
    label: 'KindOfPropertyHouse.option.terraced',
    value: 'terraced',
    hint: 'KindOfPropertyHouse.option.terraced.hint'
  },
  {
    label: 'KindOfPropertyHouse.option.endTerraced',
    value: 'end-terrace',
    hint: 'KindOfPropertyHouse.option.endTerraced.hint'
  }
]

export const KindOfPropertyHouse = (props: {
  onSubmit: (v: HouseType) => void
  defaultValues?: {
    house?: HouseType
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
    props.onSubmit(data.house)
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
          {t('KindOfPropertyHouse.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Details
          summary={
            t('why-do-we-ask', {
              ns: 'common'
            }) as string
          }
        >
          <GovUK.Paragraph>
            {t('KindOfPropertyHouse.description.a') as string}
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            {t('KindOfPropertyHouse.description.b') as string}
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.house?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.house?.message && (
              <GovUK.ErrorText>{errors?.house.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint && t(option.hint)}
                value={option.value}
                type="radio"
                {...register('house', {
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
