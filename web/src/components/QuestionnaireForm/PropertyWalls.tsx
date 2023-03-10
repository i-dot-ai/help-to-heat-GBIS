import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'propertyWalls'>

const options = [
  {
    label: 'Solid walls',
    value: 'Solid walls',
    hint: ''
  },
  {
    label: 'Cavity walls ',
    value: 'Cavity walls ',
    hint: ''
  },
  {
    label: 'Mix of solid and cavity walls',
    value: 'Mix of solid and cavity walls',
    hint: ''
  },
  {
    label: 'I don’t see my option listed',
    value: 'I don’t see my option listed',
    hint: ''
  },
  {
    label: 'I don’t know',
    value: 'I don’t know',
    hint: ''
  }
]

export const PropertyWalls = ({ nextStep }: { nextStep: number }) => {
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
        <GovUK.Fieldset.Legend size="L">
          What kind of walls does your property have?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.propertyWalls?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.propertyWalls?.message && (
              <GovUK.ErrorText>{errors?.propertyWalls.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('propertyWalls', {
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
