import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'secondaryQuestionsOnProperty'>

const options = [
  {
    label: 'Rural / urban indicator',
    value: 'Rural / urban indicator',
    hint: ''
  },
  {
    label: 'Construction type',
    value: 'Construction type',
    hint: '(brick wall, cavity wall, timber frame, unknown) '
  },
  {
    label: 'Property type',
    value: 'Property type',
    hint: ''
  },
  {
    label: 'Number of bedrooms',
    value: 'Number of bedrooms',
    hint: ''
  },
  {
    label: 'Primary heat source',
    value: 'Primary heat source',
    hint: ''
  },
  {
    label: 'Previous measures',
    value: 'Previous measures',
    hint: ''
  },
  {
    label: 'Radiators?',
    value: 'Radiators?',
    hint: ''
  },
  {
    label: 'Cavity walls filled',
    value: 'Cavity walls filled',
    hint: ''
  }
]

export const SecondaryQuestionsOnProperty = ({ nextStep }: { nextStep: number }) => {
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
    router.push(`/questionnaire?step=${nextStep}`)
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
        <GovUK.Fieldset.Legend size="M">
          Secondary questions on property
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup
          error={submitCount > 0 && !!errors?.secondaryQuestionsOnProperty?.message}
        >
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.secondaryQuestionsOnProperty?.message && (
              <GovUK.ErrorText>
                {errors?.secondaryQuestionsOnProperty.message}
              </GovUK.ErrorText>
            )}
            {options.map((option) => (
              <GovUK.Checkbox
                key={option.value}
                hint={option.hint}
                type="checkbox"
                value={option.value}
                {...register('secondaryQuestionsOnProperty', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                })}
              >
                {option.label}
              </GovUK.Checkbox>
            ))}
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
