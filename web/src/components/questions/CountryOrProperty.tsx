import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { LocationType } from '@/types'
import { Button } from '@/components/ui/Button'

type Inputs = {
  location: LocationType
}

export const CountryOrProperty = (props: {
  onSubmit: (v: LocationType) => void
  defaultValues?: {
    location?: LocationType
  }
}) => {
  const { t } = useTranslation(['questionnaire'])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: props.defaultValues
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.onSubmit(data.location)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('CountryOrProperty.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={!!errors?.location?.message}>
          <GovUK.Label mb={4}>
            {errors?.location?.message && (
              <GovUK.ErrorText>{errors?.location.message}</GovUK.ErrorText>
            )}

            <GovUK.Radio
              type="radio"
              value="England"
              {...register('location', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('country-england', {
                ns: 'common'
              })}
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Scotland"
              {...register('location', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('country-scotland', {
                ns: 'common'
              })}
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Wales"
              {...register('location', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('country-wales', {
                ns: 'common'
              })}
            </GovUK.Radio>
            <GovUK.Radio
              type="radio"
              value="Northern Ireland"
              {...register('location', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('country-northern-ireland', {
                ns: 'common'
              })}
            </GovUK.Radio>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <Button type="submit">
        {t('continue', {
          ns: 'common'
        })}
      </Button>
    </form>
  )
}
