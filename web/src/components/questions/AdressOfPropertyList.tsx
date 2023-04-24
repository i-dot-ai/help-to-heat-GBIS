import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { Button } from '@/components/ui/Button'

import type { AddressUPRNType, SuggestedAddressType } from '@/types'

type Inputs = {
  addressUPRN: AddressUPRNType
}

export const AdressOfPropertyList = ({
  suggestedAddresses = [],
  ...props
}: {
  onSubmit: (v: AddressUPRNType) => void
  defaultValues?: {
    addressUPRN?: AddressUPRNType
  }
  suggestedAddresses?: SuggestedAddressType[]
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
    props.onSubmit(data.addressUPRN)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('AdressOfPropertyList.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Label mb={4}>
          {submitCount > 0 && errors?.addressUPRN?.message && (
            <GovUK.ErrorText>{errors?.addressUPRN.message}</GovUK.ErrorText>
          )}
          {suggestedAddresses.map((option) => (
            <GovUK.Radio
              key={option.uprn}
              type="radio"
              value={option.uprn}
              {...register('addressUPRN', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {option.address}
            </GovUK.Radio>
          ))}
        </GovUK.Label>
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
