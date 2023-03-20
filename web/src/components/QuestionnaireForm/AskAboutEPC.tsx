import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

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
    const _data = {
      ...data,
      propertyHasEpc: (data.propertyHasEpc as unknown as string) === 'yes'
    }
    save(_data)
    if (!_data.propertyHasEpc) {
      router.push(`/questionnaire?step=6`)
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          Does the property have an energy performance certificate (EPC)?
        </GovUK.Fieldset.Legend>

        <GovUK.Paragraph>
          You will need to provide the EPC rating and the date of the assessment for your
          property.
        </GovUK.Paragraph>
        <GovUK.Paragraph>
          If you cannot find your EPC, or you are unsure if your property has one, you can
          [check if your property has an EPC](https://www.gov.uk/find-energy-certificate).
        </GovUK.Paragraph>
        <GovUK.Paragraph>
          If your property does not have have an EPC, you may need to get a new
          certificate depending on which home improvement scheme you are eligible for.
        </GovUK.Paragraph>

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
