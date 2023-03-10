import React, { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'propertyEpcRating' | 'propertyEpcDateOfCertificate'>

// @ts-expect-error TBC
const DateField = ({ input: { onChange, onBlur, ...input }, children, ...props }) => {
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

export const validateDateOfBirth: (value?: {
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
  return 'Please enter a date'
}

const options = [
  {
    label: 'A',
    value: 'A',
    hint: ''
  },
  {
    label: 'B',
    value: 'B',
    hint: ''
  },
  {
    label: 'C',
    value: 'C',
    hint: ''
  },
  {
    label: 'D',
    value: 'D',
    hint: ''
  },
  {
    label: 'E',
    value: 'E',
    hint: ''
  },
  {
    label: 'F',
    value: 'F',
    hint: ''
  },
  {
    label: 'G',
    value: 'G',
    hint: ''
  }
]

export const PropertyEPC = ({ nextStep }: { nextStep: number }) => {
  const { data, save } = useContext(QuestionnaireContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: data
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    router.push(`/questionnaire?step=${nextStep}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">Enter your EPC</GovUK.Fieldset.Legend>

        <GovUK.Label mb={4}>
          Date of certificate
          {submitCount > 0 && errors?.propertyEpcRating?.message && (
            <GovUK.ErrorText>{errors?.propertyEpcRating.message}</GovUK.ErrorText>
          )}
          {options.map((option) => (
            <GovUK.Radio
              key={option.value}
              hint={option.hint}
              type="radio"
              value={option.value}
              {...register('propertyEpcRating', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              {option.label}
            </GovUK.Radio>
          ))}
        </GovUK.Label>

        <DateField
          errorText={
            submitCount > 0 ? errors?.propertyEpcDateOfCertificate?.message : undefined
          }
          input={register('propertyEpcDateOfCertificate', {
            validate: validateDateOfBirth
          })}
        >
          Date of certificate
        </DateField>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
