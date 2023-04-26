import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { PropertyEPCDetailsType, SuggestedEPCIsCorrectType } from '@/types'
import { Button } from '@/components/ui/Button'

type Inputs = {
  suggestedEPCIsCorrect: SuggestedEPCIsCorrectType
}

const options: {
  label: string
  value: SuggestedEPCIsCorrectType
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

export const FoundEPC = (props: {
  onSubmit: (v: SuggestedEPCIsCorrectType) => void
  defaultValues?: {
    suggestedEPCIsCorrect?: SuggestedEPCIsCorrectType
  }
  propertyEpcRating?: PropertyEPCDetailsType
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
    props.onSubmit(data.suggestedEPCIsCorrect)
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
        <GovUK.Fieldset.Legend size="L">{t('FoundEPC.title')}</GovUK.Fieldset.Legend>
        <GovUK.Paragraph>{t('FoundEPC.description') as string}</GovUK.Paragraph>
        <GovUK.Paragraph>{t('FoundEPC.description.a') as string}</GovUK.Paragraph>

        <pre>{JSON.stringify(props.propertyEpcRating, null, 2)}</pre>

        <GovUK.FormGroup
          error={submitCount > 0 && !!errors?.suggestedEPCIsCorrect?.message}
        >
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.suggestedEPCIsCorrect?.message && (
              <GovUK.ErrorText>{errors?.suggestedEPCIsCorrect.message}</GovUK.ErrorText>
            )}
            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('suggestedEPCIsCorrect', {
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
