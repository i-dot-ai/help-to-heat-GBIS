import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'accessToLoft'>

const options = [
  {
    label: 'Yes, there is access to my loft',
    value: 'Yes',
    hint: ''
  },
  {
    label: 'No, there is no access to my loft',
    value: 'No',
    hint: ''
  }
]

export const AccessToLoft = ({ nextStep }: { nextStep: number }) => {
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
          Is there access to your loft?
        </GovUK.Fieldset.Legend>
        <GovUK.Paragraph>
          You may have a loft hatch, access ladder or stairs that could allow an
          insulation installer to get into the loft space.
        </GovUK.Paragraph>

        <GovUK.InsetText>
          Homes of your type typically{' '}
          <span
            style={{
              fontWeight: 600
            }}
          >
            have access to their loft
          </span>
        </GovUK.InsetText>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.accessToLoft?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.accessToLoft?.message && (
              <GovUK.ErrorText>{errors?.accessToLoft.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('accessToLoft', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                })}
              >
                {option.label}
              </GovUK.Radio>
            ))}
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
