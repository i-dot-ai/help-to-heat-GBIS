import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'wallInsulation'>

const options = [
  {
    label: 'Yes they are all insulated ',
    value: 'Yes they are all insulated ',
    hint: ''
  },
  {
    label: 'Some are insulated, some are not',
    value: 'Some are insulated, some are not',
    hint: ''
  },
  {
    label: 'No they are not insulated',
    value: 'No they are not insulated',
    hint: ''
  },
  {
    label: `I don't know`,
    value: `I don't know`,
    hint: ''
  }
]

export const WallInsulation = ({ nextStep }: { nextStep: number }) => {
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
        <GovUK.Fieldset.Legend size="L">Are your walls insulated?</GovUK.Fieldset.Legend>

        <GovUK.Paragraph>
          Cavity walls built before 1991 are typically uninsulated, unless you or someone
          before you had insulation installed.
        </GovUK.Paragraph>
        <GovUK.Paragraph>
          Cavity walls built after 1991 were typically built with insulating material
          between the outer and inner walls.
        </GovUK.Paragraph>
        <GovUK.Details summary="Help me answer this question">
          <GovUK.Paragraph>
            Homes built after 1991 were typically built with insulating material between
            the outer and inner walls.
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            If your home was converted, for example it was a shop or other commercial
            premises before, it may have been built without insulation.
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.wallInsulation?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.wallInsulation?.message && (
              <GovUK.ErrorText>{errors?.wallInsulation.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('wallInsulation', {
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
