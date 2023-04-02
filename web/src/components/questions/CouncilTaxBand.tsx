import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { Link } from 'govuk-react'
import { CouncilTaxBandType } from '@/types'

type Inputs = {
  counciltaxBand: CouncilTaxBandType
}

export const CouncilTaxBand = ({
  counciltaxBandsSize = 8,
  ...props
}: {
  onSubmit: (v: CouncilTaxBandType) => void
  defaultValues?: {
    counciltaxBand: CouncilTaxBandType
  }
  counciltaxBandsSize?: 8 | 9
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
    props.onSubmit(data.counciltaxBand)
  }

  const errorsToShow = Object.keys(errors)

  const councilTaxBands = Array.from({ length: counciltaxBandsSize }, (_, i) =>
    String.fromCharCode(65 + i)
  ).map((option) => <option key={option}>{option}</option>)

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
          {t('CouncilTaxBand.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.counciltaxBand?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.counciltaxBand?.message && (
              <GovUK.ErrorText>{errors?.counciltaxBand.message}</GovUK.ErrorText>
            )}

            <GovUK.Select
              mb={8}
              label={t('CouncilTaxBand.select')}
              hint={
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.gov.uk/council-tax-bands"
                >
                  {t('CouncilTaxBand.select.hint')}
                </Link>
              }
              input={register('counciltaxBand', {
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
              {councilTaxBands}
            </GovUK.Select>
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
