import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { HouseholdIncomeType } from '@/types'

type Inputs = {
  householdIncome: HouseholdIncomeType
}

const options: {
  label: string
  value: HouseholdIncomeType
  hint?: string
}[] = [
  {
    label: 'HouseholdIncome.option.a',
    value: '<£31k'
  },
  {
    label: 'HouseholdIncome.option.b',
    value: '>£31k'
  }
]

export const HouseholdIncome = (props: {
  onSubmit: (v: HouseholdIncomeType) => void
  defaultValues?: {
    householdIncome?: HouseholdIncomeType
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
    props.onSubmit(data.householdIncome)
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
          {t('HouseholdIncome.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.householdIncome?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.householdIncome?.message && (
              <GovUK.ErrorText>{errors?.householdIncome.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.value}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('householdIncome', {
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
