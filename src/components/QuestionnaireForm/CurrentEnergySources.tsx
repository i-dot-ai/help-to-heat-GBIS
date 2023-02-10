import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'currentEnergySources'>

export const validateNationality: (value?: string[]) => string | undefined = (value) =>
  value?.length ? undefined : 'Please select at least one nationality'

export const CurrentEnergySources = () => {
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
    router.push('/questionnaire?step=3')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errorsToShow?.length && (
        <GovUK.ErrorSummary
          heading="Error summary"
          description="Please address the following issues"
          errors={errorsToShow.map((key) => ({
            targetName: key,
            text: errors[key as keyof Inputs]?.message
          }))}
        />
      )}

      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="M">currentEnergySources</GovUK.Fieldset.Legend>

        <GovUK.FormGroup
          error={submitCount > 0 && !!errors?.currentEnergySources?.message}
        >
          {/* <GovUK.Label mb={4}>
            <GovUK.LabelText>Nationality</GovUK.LabelText>
            {submitCount > 0 && errors?.nationality?.message && (
              <GovUK.ErrorText>{errors?.nationality.message}</GovUK.ErrorText>
            )}s
            <GovUK.Checkbox
              type="checkbox"
              value="british"
              {...register('nationality', {
                validate: validateNationality
              })}
            >
              British
            </GovUK.Checkbox>
            <GovUK.Checkbox
              type="checkbox"
              value="irish"
              {...register('nationality', {
                validate: validateNationality
              })}
            >
              Irish
            </GovUK.Checkbox>
            <GovUK.Checkbox
              type="checkbox"
              value="other"
              {...register('nationality', {
                validate: validateNationality
              })}
            >
              Citizen of another country
            </GovUK.Checkbox>
          </GovUK.Label> */}
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
