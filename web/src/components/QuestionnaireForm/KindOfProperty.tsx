import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'kindOfProperty'>

const options = [
  {
    label: 'House',
    value: 'house',
    hint: ''
  },
  {
    label: 'Bungalow',
    value: 'Bungalow',
    hint: ''
  },
  {
    label: 'Apartment, flat or masionette',
    value: 'Apartment, flat or masionette',
    hint: ''
  }
]

export const KindOfProperty = ({ nextStep }: { nextStep: number }) => {
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

  const errorsToShow = Object.keys(errors)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)

    let _nextStep = nextStep
    if (data.kindOfProperty === 'Apartment, flat or masionette') {
      _nextStep = 93
    } else if (data.kindOfProperty === 'Bungalow') {
      _nextStep = 92
    } else if (data.kindOfProperty === 'House') {
      _nextStep = 91
    }

    router.push(`/questionnaire?step=${_nextStep}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errorsToShow?.length && (
        <GovUK.ErrorSummary
          heading="Error summary"
          description="Please address the following issues"
        />
      )}

      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          What kind of property do you have?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.kindOfProperty?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.kindOfProperty?.message && (
              <GovUK.ErrorText>{errors?.kindOfProperty.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('kindOfProperty', {
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
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
