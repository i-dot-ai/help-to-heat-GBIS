import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { HousingStatusType } from '@/types'
import { Button } from '@/components/ui/Button'

const options: {
  label: string
  value: HousingStatusType
  hint?: string
}[] = [
  {
    label: 'OwningOfProperty.option.owner',
    value: 'owner'
  },
  {
    label: 'OwningOfProperty.option.tenant',
    value: 'tenant'
  },
  {
    label: 'OwningOfProperty.option.social-tenant',
    value: 'social-tenant'
  },
  {
    label: 'OwningOfProperty.option.landlord',
    value: 'landlord'
  }
]

type Inputs = {
  housingstatus: HousingStatusType
}

export const OwningOfProperty = (props: {
  onSubmit: (v: HousingStatusType) => void
  defaultValues?: {
    housingstatus?: HousingStatusType
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
    props.onSubmit(data.housingstatus)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('OwningOfProperty.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.housingstatus?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.housingstatus?.message && (
              <GovUK.ErrorText>{errors?.housingstatus.message}</GovUK.ErrorText>
            )}

            {options.map((option) => (
              <GovUK.Radio
                key={option.value}
                value={option.value}
                type="radio"
                {...register('housingstatus', {
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
