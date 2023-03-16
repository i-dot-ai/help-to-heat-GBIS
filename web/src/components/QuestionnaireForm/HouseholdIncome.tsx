import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'householdIncome'>

export const HouseholdIncome = ({ nextStep }: { nextStep: number }) => {
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
    // TBC logic
    // if (data.householdIncome === 'more-30000') {
    //   router.push('/ineligible-customer')
    // } else {
    //   router.push(`/questionnaire?step=${nextStep}`)
    // }
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
          What is your household income?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.householdIncome?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.householdIncome?.message && (
              <GovUK.ErrorText>{errors?.householdIncome.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="less-30000"
              {...register('householdIncome', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Less than £30,000 a year
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="more-30000"
              {...register('householdIncome', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              More than £30,000 a year
            </GovUK.Radio>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
