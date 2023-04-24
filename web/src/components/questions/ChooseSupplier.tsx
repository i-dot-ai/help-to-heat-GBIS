import React from 'react'
import { useTranslation } from 'next-i18next'
import * as GovUK from 'govuk-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EnergySupplierType } from '@/types'
import { Button } from '@/components/ui/Button'

type Inputs = {
  energySupplier: EnergySupplierType
}

const options: {
  label: string
  value: EnergySupplierType
  hint?: string
}[] = [
  {
    label: 'British Gas',
    value: 'british-gas'
  },
  {
    label: 'Bulb',
    value: 'bulb'
  },
  {
    label: 'E Energy',
    value: 'e-energy'
  },
  {
    label: 'Ecotricity',
    value: 'ecotricity'
  },
  {
    label: 'EDF',
    value: 'edf'
  },
  {
    label: 'EON',
    value: 'eon'
  },
  {
    label: 'ESB',
    value: 'esb'
  },
  {
    label: 'Foxglove',
    value: 'foxglove'
  },
  {
    label: 'Octopus',
    value: 'octopus'
  },
  {
    label: 'OVO',
    value: 'ovo'
  },
  {
    label: 'Scottish Power',
    value: 'scottish-power'
  },
  {
    label: 'Shell',
    value: 'shell'
  },
  {
    label: 'Utilita',
    value: 'utilita'
  },
  {
    label: 'Utility Warehouse',
    value: 'utility-warehouse'
  }
]

export const ChooseSupplier = (props: {
  onSubmit: (v: EnergySupplierType) => void
  defaultValues?: {
    energySupplier?: EnergySupplierType
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
    props.onSubmit(data.energySupplier)
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
          {t('ChooseSupplier.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.energySupplier?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.energySupplier?.message && (
              <GovUK.ErrorText>{errors?.energySupplier.message}</GovUK.ErrorText>
            )}

            <GovUK.Select
              mb={8}
              label={t('ChooseSupplier.select')}
              input={register('energySupplier', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              <option value="">
                {
                  t('please-select', {
                    ns: 'common'
                  }) as string
                }
              </option>
              {options.map((supplier) => (
                <option key={supplier.value} value={supplier.value}>
                  {supplier.label}
                </option>
              ))}
            </GovUK.Select>
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
