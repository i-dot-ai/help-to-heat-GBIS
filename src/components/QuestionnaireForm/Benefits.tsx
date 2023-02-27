import React, { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'benefits'>

export const Benefits = ({ nextStep }: { nextStep: number }) => {
  const { data, save } = useContext(QuestionnaireContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
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
          Which benefits do you receive?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.benefits?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.benefits?.message && (
              <GovUK.ErrorText>{errors?.benefits.message}</GovUK.ErrorText>
            )}
            <GovUK.Checkbox
              type="checkbox"
              value="None"
              {...register('benefits', {
                onChange(event) {
                  if (event.target.checked && event.target.value === 'None') {
                    setValue('benefits', ['None'])
                  }
                },
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              None
            </GovUK.Checkbox>
            <GovUK.Checkbox
              type="checkbox"
              value="Income benefits"
              {...register('benefits', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Income benefits
            </GovUK.Checkbox>
            <GovUK.Checkbox
              type="checkbox"
              value="Child benefits"
              {...register('benefits', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Child benefits
            </GovUK.Checkbox>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
