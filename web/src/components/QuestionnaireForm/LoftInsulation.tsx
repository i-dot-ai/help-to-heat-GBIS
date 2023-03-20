import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'loftInsulation'>

const options = [
  {
    label: 'Yes, there is at least 200mm of insulation in my loft',
    value: 'Yes',
    hint: ''
  },
  {
    label: 'No, there is less than 200mm of insulation in my loft',
    value: 'No',
    hint: ''
  },
  {
    label: `I don't know`,
    value: `I don't know`,
    hint: ''
  }
]

export const LoftInsulation = ({ nextStep }: { nextStep: number }) => {
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
          Is your loft fully insulated?
        </GovUK.Fieldset.Legend>
        <GovUK.Paragraph>
          A loft is fully insulated if it has more than 200mm (eight inches) of insulation
          covering the whole loft, usually laid on the "floor" of the loft with one layer
          between the horizontal timbers and another layer going across them to bring the
          insulation up to the required level.
        </GovUK.Paragraph>

        <GovUK.Details summary="Help me answer this question">
          <GovUK.Paragraph>
            If your home was built after 2002, or you have installed loft insulation since
            2002, it is likely that it is fully insulated.
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.loftInsulation?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.loftInsulation?.message && (
              <GovUK.ErrorText>{errors?.loftInsulation.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('loftInsulation', {
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
