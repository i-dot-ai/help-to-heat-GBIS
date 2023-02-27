import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'
import { Link } from 'govuk-react'

type Inputs = Pick<Questions, 'propertyHasEpc'>

export const AskAboutEPC = ({ nextStep }: { nextStep: number }) => {
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    router.push(`/questionnaire?step=${nextStep}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          Does the property have an energy performance certificate (EPC)?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.propertyHasEpc?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.propertyHasEpc?.message && (
              <GovUK.ErrorText>{errors?.propertyHasEpc.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="yes"
              {...register('propertyHasEpc', {
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
              hint={
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.gov.uk/find-energy-certificate"
                >
                  https://www.gov.uk/find-energy-certificate
                </Link>
              }
              {...register('propertyHasEpc', {
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
