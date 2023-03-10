import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

export const ConfirmAndSubmit = ({ nextStep }: { nextStep: number }) => {
  const { data } = useContext(QuestionnaireContext)
  const { handleSubmit } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: data
  })

  const onSubmit = (data: Questions) => {
    alert(JSON.stringify({ data, nextStep }, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">Confirm and submit</GovUK.Fieldset.Legend>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
