import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'

import { UnorderedList, ListItem, Paragraph } from 'govuk-react'
import styled from 'styled-components'
import type { PropertyAddressType } from '@/types'

const InputContainer = styled.div`
  width: 250px;
`

type Inputs = {
  address: PropertyAddressType
}

export const AddressOfProperty = (props: {
  onSubmit: (v: PropertyAddressType) => void
  defaultValues?: {
    address?: PropertyAddressType
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
    props.onSubmit(data.address)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('AddressOfProperty.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup>
          <GovUK.Label mb={4}>
            <Paragraph>{t('AddressOfProperty.description') as string}</Paragraph>
            <UnorderedList>
              <ListItem> {t('AddressOfProperty.description.a')}</ListItem>
              <ListItem> {t('AddressOfProperty.description.b')}</ListItem>
            </UnorderedList>

            <InputContainer>
              <GovUK.InputField
                mb={4}
                hint={t('ddressOfProperty.buildingNumberOrName.input.hint')}
                meta={{
                  touched: submitCount > 0,
                  error: errors?.address?.buildingNumberOrName?.message
                }}
                input={register('address.buildingNumberOrName')}
              >
                {t('AddressOfProperty.buildingNumberOrName.input')}
              </GovUK.InputField>

              <GovUK.InputField
                mb={4}
                hint={t('ddressOfProperty.postcode.input.hint')}
                meta={{
                  touched: submitCount > 0,
                  error: errors?.address?.postcode?.message
                }}
                input={register('address.postcode', {
                  required: {
                    value: true,
                    message: t('form-required', {
                      ns: 'common'
                    })
                  }
                })}
              >
                {t('AddressOfProperty.postcode.input')}
              </GovUK.InputField>
            </InputContainer>
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
