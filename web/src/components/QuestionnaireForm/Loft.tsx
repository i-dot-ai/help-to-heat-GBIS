import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'loft'>

const options = [
  {
    label: 'Yes',
    value: 'Yes',
    hint: ''
  },
  {
    label: 'No',
    value: 'No',
    hint: ''
  }
]

export const Loft = ({
  nextStep,
  nextStepNoLoft
}: {
  nextStep: number
  nextStepNoLoft: number
}) => {
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
    if (data.loft === 'No') {
      router.push(`/questionnaire?step=${nextStepNoLoft}`)
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
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
          Does this property have a loft?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.loft?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.loft?.message && (
              <GovUK.ErrorText>{errors?.loft.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('loft', {
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
