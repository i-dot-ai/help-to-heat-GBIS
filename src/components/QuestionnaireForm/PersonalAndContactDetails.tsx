import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'personalDetails'>

export const PersonalAndContactDetails = ({ nextStep }: { nextStep: number }) => {
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
          Add your personal and contact details
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.personalDetails?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.personalDetails?.message && (
              <GovUK.ErrorText>{errors?.personalDetails.message}</GovUK.ErrorText>
            )}

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.firstName?.message
              }}
              input={register('personalDetails.firstName', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              First name
            </GovUK.InputField>

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.lastName?.message
              }}
              input={register('personalDetails.lastName', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Last name
            </GovUK.InputField>

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.phoneNumber?.message
              }}
              input={register('personalDetails.phoneNumber', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Contact number
            </GovUK.InputField>

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.email?.message
              }}
              input={register('personalDetails.email', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Email
            </GovUK.InputField>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
