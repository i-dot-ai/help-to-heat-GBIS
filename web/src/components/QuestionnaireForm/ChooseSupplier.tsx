import React, { useContext } from 'react'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'
import { useForm, SubmitHandler } from 'react-hook-form'

const energySuppliers = [
  {
    label: 'British Gas',
    value: 'British Gas'
  },
  {
    label: 'Bulb',
    value: 'Bulb'
  },
  {
    label: 'E Energy',
    value: 'E Energy'
  },
  {
    label: 'Ecotricity',
    value: 'Ecotricity'
  },
  {
    label: 'EDF',
    value: 'EDF'
  },
  {
    label: 'EON',
    value: 'EON'
  },
  {
    label: 'ESB',
    value: 'ESB'
  },
  {
    label: 'Foxglove',
    value: 'Foxglove'
  },
  {
    label: 'Octopus',
    value: 'Octopus'
  },
  {
    label: 'OVO',
    value: 'OVO'
  },
  {
    label: 'Scottish Power',
    value: 'Scottish Power'
  },
  {
    label: 'Shell',
    value: 'Shell'
  },
  {
    label: 'Utilita',
    value: 'Utilita'
  },
  {
    label: 'Utility Warehouse',
    value: 'Utility Warehouse'
  }
]

type Inputs = Pick<Questions, 'energySupplier'>

const ChooseSupplier = ({ nextStep }: { nextStep: number }) => {
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

  const errorsToShow = Object.keys(errors)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    router.push(`/questionnaire?step=${nextStep}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errorsToShow?.length && (
        <GovUK.ErrorSummary
          heading="Error summary"
          description="Please address the following issues"
        />
      )}

      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          Select your home energy supplier from the list below.
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.energySupplier?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.energySupplier?.message && (
              <GovUK.ErrorText>{errors?.energySupplier.message}</GovUK.ErrorText>
            )}

            <GovUK.Select
              mb={8}
              label="If your home energy supplier is not listed, you can select any energy from the
          list."
              input={register('energySupplier', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              <option value="">Please select...</option>
              {energySuppliers.map((supplier) => (
                <option key={supplier.value} value={supplier.value}>
                  {supplier.label}
                </option>
              ))}
            </GovUK.Select>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}

export default ChooseSupplier
