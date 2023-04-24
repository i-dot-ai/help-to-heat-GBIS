import React from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { PersonalDetailsType } from '@/types'
import { Button } from '@/components/ui/Button'

type Inputs = {
  personalDetails: PersonalDetailsType
}

export const PersonalAndContactDetails = (props: {
  onSubmit: (v: PersonalDetailsType) => void
  defaultValues?: {
    personalDetails?: PersonalDetailsType
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
    props.onSubmit(data.personalDetails)
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
          {t('PersonalAndContactDetails.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.personalDetails?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.personalDetails?.message && (
              <GovUK.ErrorText>{errors?.personalDetails.message}</GovUK.ErrorText>
            )}

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.firstName?.message
              }}
              input={register('personalDetails.firstName', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('PersonalAndContactDetails.input.firstName')}
            </GovUK.InputField>

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.lastName?.message
              }}
              input={register('personalDetails.lastName', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('PersonalAndContactDetails.input.lastName')}
            </GovUK.InputField>

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.phoneNumber?.message
              }}
              input={register('personalDetails.phoneNumber', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('PersonalAndContactDetails.input.phoneNumber')}
            </GovUK.InputField>

            <GovUK.InputField
              mb={4}
              meta={{
                touched: submitCount > 0,
                error: errors?.personalDetails?.email?.message
              }}
              input={register('personalDetails.email', {
                required: {
                  value: true,
                  message: t('form-required', {
                    ns: 'common'
                  })
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t('invalid-email-address', {
                    ns: 'common'
                  })
                }
              })}
            >
              {t('PersonalAndContactDetails.input.email')}
            </GovUK.InputField>
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
