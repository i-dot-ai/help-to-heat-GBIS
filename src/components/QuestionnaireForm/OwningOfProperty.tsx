import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'owningOfProperty'>

const options = [
  {
    label: 'Yes, I own my property and live in it',
    value: 'Yes, I own my property and live in it',
    hint: ''
  },
  {
    label: 'No, I am a tenant',
    value: 'No, I am a tenant',
    hint: ''
  },
  {
    label: 'No, I am a social housing tenant',
    value: 'No, I am a social housing tenant',
    hint: ''
  },
  {
    label: 'I am a property owner but lease my property to one or more tenants',
    value: 'I am a property owner but lease my property to one or more tenants',
    hint: ''
  }
]

export const OwningOfProperty = ({ nextStep }: { nextStep: number }) => {
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

  const notSupported = ['Northern Ireland', 'Scotland']

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    if (notSupported.includes(data.owningOfProperty)) {
      router.push('/ineligible')
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">Do you own your property?</GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.owningOfProperty?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.owningOfProperty?.message && (
              <GovUK.ErrorText>{errors?.owningOfProperty.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.value}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('owningOfProperty', {
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
