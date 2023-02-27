import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'offGasGrid'>

export const GasGrid = ({ nextStep }: { nextStep: number }) => {
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

  const onSubmit: SubmitHandler<Inputs> = (payload) => {
    save(payload)
    const nonElegible = !!payload.offGasGrid && !data.propertyEpc
    if (nonElegible) {
      router.push('/non-epc-gas-grid')
    }
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
        <GovUK.Fieldset.Legend size="L">Are you off gas grid?</GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.offGasGrid?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.offGasGrid?.message && (
              <GovUK.ErrorText>{errors?.offGasGrid.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="yes"
              {...register('offGasGrid', {
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
              {...register('offGasGrid', {
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
