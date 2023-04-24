import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { Button } from '@/components/ui/Button'
import { FlatType } from '@/types'

type Inputs = {
  flat: FlatType
}

const options: {
  label: string
  value: FlatType
  hint?: string
}[] = [
  {
    label: 'KindOfPropertyBungalow.option.top-floor',
    value: 'top-floor',
    hint: 'KindOfPropertyBungalow.option.top-floor.hint'
  },
  {
    label: 'KindOfPropertyBungalow.option.middleFloor',
    value: 'middle-floor',
    hint: 'KindOfPropertyBungalow.option.middleFloor.hint'
  },
  {
    label: 'KindOfPropertyBungalow.option.groundFloor',
    value: 'ground-floor',
    hint: 'KindOfPropertyBungalow.option.groundFloor.hint'
  }
]

export const KindOfPropertyFlat = (props: {
  onSubmit: (v: FlatType) => void
  defaultValues?: {
    flat?: FlatType
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
    props.onSubmit(data.flat)
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
        <GovUK.Fieldset.Legend size="L">
          {t('KindOfPropertyFlat.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Details
          summary={
            t('why-do-we-ask', {
              ns: 'common'
            }) as string
          }
        >
          <GovUK.Paragraph>
            {t('KindOfPropertyFlat.description.a') as string}
          </GovUK.Paragraph>
          <GovUK.Paragraph>
            {t('KindOfPropertyFlat.description.b') as string}
          </GovUK.Paragraph>
        </GovUK.Details>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.flat?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.flat?.message && (
              <GovUK.ErrorText>{errors?.flat.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.label}
                hint={option.hint && t(option.hint)}
                value={option.value}
                type="radio"
                {...register('flat', {
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
