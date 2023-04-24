import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { ReceivingBenefitsType } from '@/types'
import { Button } from '@/components/ui/Button'

type Inputs = {
  receivingBenefits: ReceivingBenefitsType
}

const options: {
  label: string
  value: ReceivingBenefitsType
  hint?: string
}[] = [
  {
    label: 'yes',
    value: 'yes',
    hint: ''
  },
  {
    label: 'no',
    value: 'no',
    hint: ''
  }
]

export const Benefits = (props: {
  onSubmit: (v: ReceivingBenefitsType) => void
  defaultValues?: {
    receivingBenefits?: ReceivingBenefitsType
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
    props.onSubmit(data.receivingBenefits)
  }

  const errorsToShow = Object.keys(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errorsToShow?.length && (
        <GovUK.ErrorSummary
          heading={
            t('error-title', {
              ns: 'common'
            }) as string
          }
          description={
            t('error-message', {
              ns: 'common'
            }) as string
          }
        />
      )}

      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">{t('Benefits.title')}</GovUK.Fieldset.Legend>

        <GovUK.Paragraph>{t('Benefits.description.b') as string}</GovUK.Paragraph>

        <GovUK.UnorderedList>
          <GovUK.ListItem>{t('Benefits.description.c')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.d')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.e')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.f')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.g')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.h')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.i')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.j')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.k')}</GovUK.ListItem>
          <GovUK.ListItem>{t('Benefits.description.l')}</GovUK.ListItem>
        </GovUK.UnorderedList>

        <GovUK.Paragraph>{t('Benefits.description.m') as string}</GovUK.Paragraph>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.receivingBenefits?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.receivingBenefits?.message && (
              <GovUK.ErrorText>{errors?.receivingBenefits.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('receivingBenefits', {
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

      <Button type="submit">
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </Button>
    </form>
  )
}
