import React, { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'suggestedEPCIsCorrect'>

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

export const FoundEPC = ({
  nextStep,
  wrongEpcStep
}: {
  nextStep: number
  wrongEpcStep: number
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
    if (data.suggestedEPCIsCorrect === 'No') {
      router.push(`/questionnaire?step=${wrongEpcStep}`)
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }

  useEffect(() => {
    if (!data.propertyHasEpc) {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }, [data, nextStep, router])

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
          We’ve found an EPC that might be yours
        </GovUK.Fieldset.Legend>
        <GovUK.Paragraph>
          This certificate may be registered to your property or one of the properties
          nearby that shares part of your address.
        </GovUK.Paragraph>
        <GovUK.Paragraph>Is this correct?</GovUK.Paragraph>

        <GovUK.FormGroup
          error={submitCount > 0 && !!errors?.suggestedEPCIsCorrect?.message}
        >
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.suggestedEPCIsCorrect?.message && (
              <GovUK.ErrorText>{errors?.suggestedEPCIsCorrect.message}</GovUK.ErrorText>
            )}
            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('suggestedEPCIsCorrect', {
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
