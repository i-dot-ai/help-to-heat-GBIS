import React, { useContext, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'

type Inputs = Pick<Questions, 'addressUPRN'>

export const AdressOfPropertyList = ({ nextStep }: { nextStep: number }) => {
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<
    {
      postcode: string
      uprn: string
      address: string
    }[]
  >([])
  const { data, save } = useContext(QuestionnaireContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: data
  })

  const addressNotFound = false

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    if (addressNotFound) {
      // TBC
      router.push('/address-not-found')
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }

  useEffect(() => {
    const { address } = data
    const { postcode, buildingNumberOrName } = address || {}

    if (!postcode && !buildingNumberOrName) {
      router.push('/questionnaire?step=3')
    }

    const fullAddress = `${buildingNumberOrName} ${postcode}`
    let path = `api/uprn?address=${fullAddress}`
    if (!buildingNumberOrName) {
      path = `api/uprn?postcode=${postcode}`
    }

    fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((r) => r.json())
      .then((r) => {
        setOptions(r)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [data, router])

  return (
    <GovUK.LoadingBox loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GovUK.Fieldset>
          <GovUK.Fieldset.Legend size="L">Select your address</GovUK.Fieldset.Legend>

          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.addressUPRN?.message && (
              <GovUK.ErrorText>{errors?.addressUPRN.message}</GovUK.ErrorText>
            )}
            {!loading && options.length === 0 && (
              <p>__PLACEHOLDER__: Address not found __PLACEHOLDER__</p>
            )}
            {options.map((option) => (
              <GovUK.Radio
                key={option.uprn}
                type="radio"
                value={option.uprn}
                {...register('addressUPRN', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                })}
              >
                {option.address}
              </GovUK.Radio>
            ))}
          </GovUK.Label>
        </GovUK.Fieldset>

        <GovUK.Button type="submit">Continue</GovUK.Button>
      </form>
    </GovUK.LoadingBox>
  )
}
