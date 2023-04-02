import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'

import { WallType } from '@/types'

type Inputs = {
  walls: WallType
}

const options: {
  label: string
  value: WallType
  hint?: string
}[] = [
  {
    label: 'PropertyWalls.option.solid',
    value: 'solid'
  },
  {
    label: 'PropertyWalls.option.cavity',
    value: 'cavity'
  },
  {
    label: 'PropertyWalls.option.mix',
    value: 'mix'
  },
  {
    label: `PropertyWalls.option.not-listed`,
    value: `not-listed`
  },
  {
    label: `PropertyWalls.option.unknown`,
    value: `unknown`
  }
]

export const PropertyWalls = (props: {
  onSubmit: (v: WallType) => void
  defaultValues?: {
    walls?: WallType
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
    props.onSubmit(data.walls)
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
        <GovUK.Fieldset.Legend size="L">{t('PropertyWalls.title')}</GovUK.Fieldset.Legend>

        <GovUK.Paragraph>{t('PropertyWalls.description.a') as string}</GovUK.Paragraph>
        <GovUK.Paragraph>{t('PropertyWalls.description.b') as string}</GovUK.Paragraph>

        <GovUK.Details summary={t('PropertyWalls.description')}>
          <GovUK.Paragraph>{t('PropertyWalls.description.c') as string}</GovUK.Paragraph>
          <GovUK.Paragraph>{t('PropertyWalls.description.d') as string}</GovUK.Paragraph>
          <GovUK.Paragraph>{t('PropertyWalls.description.e') as string}</GovUK.Paragraph>
          <GovUK.Paragraph>{t('PropertyWalls.description.f') as string}</GovUK.Paragraph>
          <GovUK.Paragraph>{t('PropertyWalls.description.g') as string}</GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.walls?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.walls?.message && (
              <GovUK.ErrorText>{errors?.walls.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                value={option.value}
                type="radio"
                {...register('walls', {
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
