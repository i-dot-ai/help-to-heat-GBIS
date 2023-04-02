import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { PropertyHasEPCType } from '@/types'

type Inputs = {
  propertyHasEpc: PropertyHasEPCType
}

const options: {
  label: string
  value: PropertyHasEPCType
  hint?: string
}[] = [
  {
    label: 'yes',
    value: 'yes'
  },
  {
    label: 'no',
    value: 'no'
  }
]

export const AskAboutEPC = (props: {
  onSubmit: (v: PropertyHasEPCType) => void
  defaultValues?: {
    propertyHasEpc?: PropertyHasEPCType
  }
}) => {
  const { t } = useTranslation(['questionnaire'])
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: props.defaultValues
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onSubmit(data.propertyHasEpc)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">{t('AskAboutEPC.title')}</GovUK.Fieldset.Legend>

        <GovUK.Paragraph>{t('AskAboutEPC.description.a') as string}</GovUK.Paragraph>
        <GovUK.Paragraph>{t('AskAboutEPC.description.b') as string}</GovUK.Paragraph>
        <GovUK.Paragraph>{t('AskAboutEPC.description.c') as string}</GovUK.Paragraph>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.propertyHasEpc?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.propertyHasEpc?.message && (
              <GovUK.ErrorText>{errors?.propertyHasEpc.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('propertyHasEpc', {
                  required: {
                    value: true,
                    message: t('form-required', {
                      ns: 'common'
                    })
                  }
                })}
              >
                {t(option.label, { ns: 'common' })}
              </GovUK.Radio>
            ))}
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </GovUK.Button>
    </form>
  )
}
