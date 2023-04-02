import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { EpcRatingType, PropertyEPCDetailsType } from '@/types'

type Inputs = {
  propertyEpcDetails: PropertyEPCDetailsType
}

const options: {
  label: string
  value: EpcRatingType
  hint?: string
}[] = [
  {
    label: 'A',
    value: 'A'
  },
  {
    label: 'B',
    value: 'B'
  },
  {
    label: 'C',
    value: 'C'
  },
  {
    label: 'D',
    value: 'D'
  },
  {
    label: 'E',
    value: 'E'
  },
  {
    label: 'F',
    value: 'F'
  },
  {
    label: 'G',
    value: 'G'
  }
]

const DateField = ({
  input: { onChange, onBlur, ...input },
  children,
  ...props
}: any) => {
  const [value, setValue] = useState(input.value)
  return (
    <GovUK.DateField
      {...props}
      input={{
        onChange: (newValue) => {
          setValue({ ...value, ...newValue })
          onChange({ target: { value: { ...value, ...newValue }, name: input.name } })
        },
        onBlur: () => onBlur({ target: { value, name: input.name } }),
        ...input
      }}
    >
      {children}
    </GovUK.DateField>
  )
}

export const validateCertificateDate: (value?: {
  year?: number | string
  month?: number | string
  day?: number | string
}) => string | undefined = (value) => {
  if (value && value.year && value.month && value.day) {
    const year = Number(value.year)
    const month = Number(value.month) - 1
    const day = Number(value.day)
    const testDate = new Date(year, month, day)
    if (
      // Check date is in the past
      testDate < new Date() &&
      // Is after 1900
      testDate.getFullYear() > 1900 &&
      // and a real date resolves to the inputted date (e.g. month is not 13, not 29th February on a non leap year)
      testDate.getFullYear() === year &&
      testDate.getMonth() === month &&
      testDate.getDate() === day
    ) {
      return undefined
    }
  }
  return 'Please enter a valid date'
}

export const PropertyEPC = (props: {
  onSubmit: (v: PropertyEPCDetailsType) => void
  defaultValues?: {
    propertyEpcDetails?: PropertyEPCDetailsType | undefined
  }
}) => {
  const { t } = useTranslation(['questionnaire'])
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      propertyEpcDetails: props?.defaultValues?.propertyEpcDetails
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onSubmit(data.propertyEpcDetails)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">{t('PropertyEPC.title')}</GovUK.Fieldset.Legend>

        <GovUK.Label mb={4}>
          {submitCount > 0 && errors?.propertyEpcDetails?.propertyEpcRating?.message && (
            <GovUK.ErrorText>
              {errors?.propertyEpcDetails?.propertyEpcRating.message}
            </GovUK.ErrorText>
          )}
          <GovUK.Select
            mb={8}
            label={t('PropertyEPC.input.propertyEpcRating')}
            input={register('propertyEpcDetails.propertyEpcRating', {
              required: {
                value: true,
                message: t('form-required', {
                  ns: 'common'
                })
              }
            })}
          >
            <option value="">
              {
                t('please-select', {
                  ns: 'common'
                }) as string
              }
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </GovUK.Select>
        </GovUK.Label>

        <DateField
          errorText={
            submitCount > 0
              ? errors.propertyEpcDetails?.propertyEpcDate?.message
              : undefined
          }
          input={register('propertyEpcDetails.propertyEpcDate', {
            validate: validateCertificateDate
          })}
          defaultValues={getValues('propertyEpcDetails.propertyEpcDate')}
        >
          {t('PropertyEPC.input.propertyEpcDate')}
        </DateField>
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
