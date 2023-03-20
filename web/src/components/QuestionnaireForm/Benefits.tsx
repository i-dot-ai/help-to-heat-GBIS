import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'benefits' | 'location'>

export const Benefits = ({ nextStep }: { nextStep: number }) => {
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

  const options = [
    {
      label: 'Yes',
      value: 'Yes',
      hint: ''
    },
    {
      label: 'No',
      value: 'No',
      hint: ''
    }
  ]

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
          Is anyone in your household receiving any benefits?
        </GovUK.Fieldset.Legend>

        <GovUK.Paragraph>
          Select yes if they are receiving any of the following:
        </GovUK.Paragraph>

        <GovUK.UnorderedList>
          <GovUK.ListItem>Income based Jobseekers Allowance</GovUK.ListItem>
          <GovUK.ListItem>Income related Employment and Support Allowance</GovUK.ListItem>
          <GovUK.ListItem>Income Support</GovUK.ListItem>
          <GovUK.ListItem>Pension Credit Guarantee Credit</GovUK.ListItem>
          <GovUK.ListItem>Working Tax Credit</GovUK.ListItem>
          <GovUK.ListItem>Child Tax Credit</GovUK.ListItem>
          <GovUK.ListItem>Universal Credit</GovUK.ListItem>
          <GovUK.ListItem>Housing Benefit</GovUK.ListItem>
          <GovUK.ListItem>Pension Credit Savings Credit</GovUK.ListItem>
          <GovUK.ListItem>Child Benefit</GovUK.ListItem>
        </GovUK.UnorderedList>

        <GovUK.Paragraph>
          You may be asked to provide evidence of this at a later stage.
        </GovUK.Paragraph>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.benefits?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.benefits?.message && (
              <GovUK.ErrorText>{errors?.benefits.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.label}
                type="radio"
                {...register('benefits', {
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
