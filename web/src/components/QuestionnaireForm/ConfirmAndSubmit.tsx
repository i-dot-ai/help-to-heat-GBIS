import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'
import { useRouter } from 'next/router'

export const ConfirmAndSubmit = () => {
  const router = useRouter()
  const { data } = useContext(QuestionnaireContext)
  const { handleSubmit } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: data
  })

  const onSubmit = async (data: Questions) => {
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    }).then(() => {
      router.push('/success')
    })
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
