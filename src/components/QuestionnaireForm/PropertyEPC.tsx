import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'propertyEpc'>

export const PropertyEPC = ({ nextStep }: { nextStep: number }) => {
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
        <GovUK.Fieldset.Legend size="L">Enter your EPC</GovUK.Fieldset.Legend>

        <GovUK.Label mb={4}>
          <GovUK.InputField
            mb={4}
            meta={{
              touched: submitCount > 0,
              error: errors?.propertyEpc?.message
            }}
            input={register('propertyEpc', {
              required: {
                value: true,
                message: 'This field is required'
              }
            })}
          >
            EPC value
          </GovUK.InputField>
        </GovUK.Label>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
