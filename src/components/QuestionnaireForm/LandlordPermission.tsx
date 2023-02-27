import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'landlordPermission'>

export const LandlordPermission = ({ nextStep }: { nextStep: number }) => {
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
        <GovUK.Fieldset.Legend size="L">Landlord permission</GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.landlordPermission?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.landlordPermission?.message && (
              <GovUK.ErrorText>{errors?.landlordPermission.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="yes"
              {...register('landlordPermission', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Yes
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="no"
              {...register('landlordPermission', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              No
            </GovUK.Radio>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
