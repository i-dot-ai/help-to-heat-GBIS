import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'kindOfPropertyFlat'>

const options = [
  {
    label: 'Top floor',
    value: 'Top floor',
    hint: 'Sits directly below the roof with no other flat above it'
  },
  {
    label: 'Middle floor',
    value: 'Middle floor',
    hint: 'Has another flat above, and another below'
  },
  {
    label: 'Ground floor',
    value: 'Ground floor',
    hint: 'The lowest flat in the building with no flat beneath - typically at street level but may be a basement'
  }
]

export const KindOfPropertyFlat = ({ nextStep }: { nextStep: number }) => {
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
          What kind of flat do you have?
        </GovUK.Fieldset.Legend>

        <GovUK.Details summary="Why do we need to know this?">
          <GovUK.Paragraph>
            Energy use varies between different buildings, particularly for heating.
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            Some home improvements are only possible or appropriate for certain buildings.
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.kindOfPropertyFlat?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.kindOfPropertyFlat?.message && (
              <GovUK.ErrorText>{errors?.kindOfPropertyFlat.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('kindOfPropertyFlat', {
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
