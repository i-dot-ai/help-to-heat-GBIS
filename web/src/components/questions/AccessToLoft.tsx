import React from 'react'
import { useTranslation, Trans } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import type { LoftAccessType } from '@/types'

type Inputs = {
  loftAccess: LoftAccessType
}

const options: {
  label: string
  value: LoftAccessType
  hint?: string
}[] = [
  {
    label: 'AccessToLoft.yes',
    value: 'yes'
  },
  {
    label: 'AccessToLoft.no',
    value: 'no'
  }
]

export const AccessToLoft = (props: {
  onSubmit: (v: LoftAccessType) => void
  defaultValues?: {
    loftAccess?: LoftAccessType
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
    props.onSubmit(data.loftAccess)
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
        <GovUK.Fieldset.Legend size="L">{t('AccessToLoft.title')}</GovUK.Fieldset.Legend>
        <GovUK.Paragraph>{t('AccessToLoft.description') as string}</GovUK.Paragraph>

        <GovUK.InsetText>
          <Trans
            t={t}
            i18nKey="AccessToLoft.homes"
            components={[
              <span
                key="aa"
                style={{
                  fontWeight: 600
                }}
              />
            ]}
          />
        </GovUK.InsetText>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.loftAccess?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.loftAccess?.message && (
              <GovUK.ErrorText>{errors?.loftAccess.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint}
                value={option.value}
                type="radio"
                {...register('loftAccess', {
                  required: {
                    value: true,
                    message: t('form-required', {
                      ns: 'common'
                    })
                  }
                })}
              >
                {t(option.label)}
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
