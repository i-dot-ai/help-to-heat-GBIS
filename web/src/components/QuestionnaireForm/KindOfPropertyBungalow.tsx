import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'kindOfPropertyBungalow'>

const options = [
  {
    label: 'Detached',
    value: 'Detached',
    hint: ''
  },
  {
    label: 'Semi-detached',
    value: 'Semi-detached',
    hint: ''
  },
  {
    label: 'Terraced',
    value: 'Terraced',
    hint: ''
  },
  {
    label: 'End terrace',
    value: 'End terrace',
    hint: ''
  }
]

export const KindOfPropertyBungalow = ({ nextStep }: { nextStep: number }) => {
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
          What kind of bungalow do you have?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup
          error={submitCount > 0 && !!errors?.kindOfPropertyBungalow?.message}
        >
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.kindOfPropertyBungalow?.message && (
              <GovUK.ErrorText>{errors?.kindOfPropertyBungalow.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('kindOfPropertyBungalow', {
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
