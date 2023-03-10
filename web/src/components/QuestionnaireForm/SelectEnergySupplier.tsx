import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'energySupplier'>

export const SelectEnergySupplier = ({ nextStep }: { nextStep: number }) => {
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
    // TBC
    if (false) {
      router.push('/supplier-not-participating')
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
          Select your energy supplier
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.energySupplier?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.energySupplier?.message && (
              <GovUK.ErrorText>{errors?.energySupplier.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="No, I am a tenant"
              {...register('energySupplier', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Yes, I own my property and live in it
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="No, I am a social housing tenant"
              {...register('energySupplier', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              No, I am a tenant
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Wales"
              {...register('energySupplier', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              No, I am a social housing tenant
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Northern Ireland"
              {...register('energySupplier', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              I am a property owner but lease my property to one or more tenants
            </GovUK.Radio>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
