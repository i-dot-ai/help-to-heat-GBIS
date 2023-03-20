import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'location'>

export const CountryOrProperty = ({ nextStep }: { nextStep: number }) => {
  const { data, save } = useContext(QuestionnaireContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: data
  })

  const notSupported = ['Northern Ireland', 'Scotland']

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    if (notSupported.includes(data.location)) {
      router.push('/ineligible-country')
    } else {
      router.push({
        pathname: `/questionnaire`,
        query: { step: nextStep }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          Which country is your property located in?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={!!errors?.location?.message}>
          <GovUK.Label mb={4}>
            {errors?.location?.message && (
              <GovUK.ErrorText>{errors?.location.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="England"
              {...register('location', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              England
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Scotland"
              {...register('location', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Scotland
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Wales"
              {...register('location', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Wales
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Northern Ireland"
              {...register('location', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              Northern Ireland
            </GovUK.Radio>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
