import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'

import { LandlordPermissionType } from '@/types'

type Inputs = {
  landlordPermission: LandlordPermissionType
}

const options: {
  label: string
  value: LandlordPermissionType
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

export const LandlordPermission = (props: {
  onSubmit: (v: LandlordPermissionType) => void
  defaultValues?: {
    landlordPermission?: LandlordPermissionType
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
    props.onSubmit(data.landlordPermission)
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
          {t('LandlordPermission.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.landlordPermission?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.landlordPermission?.message && (
              <GovUK.ErrorText>{errors?.landlordPermission.message}</GovUK.ErrorText>
            )}
            {options.map((option) => (
              <GovUK.Radio
                key={option.value}
                value={option.value}
                type="radio"
                {...register('landlordPermission', {
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
