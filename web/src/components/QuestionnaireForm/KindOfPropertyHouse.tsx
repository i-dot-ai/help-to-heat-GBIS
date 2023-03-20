import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'kindOfPropertyHouse'>

const options = [
  {
    label: 'Detached',
    value: 'Detached',
    hint: 'Does not share any of its walls with another house or building'
  },
  {
    label: 'Semi-detached',
    value: 'Semi-detached',
    hint: 'Is attached to one other house or building'
  },
  {
    label: 'Terraced',
    value: 'Terraced',
    hint: 'Sits in the middle with a house or building on each side'
  },
  {
    label: 'End terrace',
    value: 'End terrace',
    hint: 'Sits at the end of a row of similar houses with one house attached to it'
  }
]

export const KindOfPropertyHouse = ({ nextStep }: { nextStep: number }) => {
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
          What kind of house do you have?
        </GovUK.Fieldset.Legend>

        <GovUK.Details summary="Why do we need to know this?">
          <GovUK.Paragraph>
            Energy use varies between different buildings, particularly for heating.
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            Some home improvements are only possible or appropriate for certain buildings.
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup
          error={submitCount > 0 && !!errors?.kindOfPropertyHouse?.message}
        >
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.kindOfPropertyHouse?.message && (
              <GovUK.ErrorText>{errors?.kindOfPropertyHouse.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('kindOfPropertyHouse', {
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
