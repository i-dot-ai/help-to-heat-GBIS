import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'
import { Link } from 'govuk-react'

type Inputs = Pick<Questions, 'councilTaxBand'>

export const CouncilTaxBand = ({ nextStep }: { nextStep: number }) => {
  const { data: contextData, save } = useContext(QuestionnaireContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount }
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit',
    defaultValues: contextData
  })

  const errorsToShow = Object.keys(errors)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)

    if (contextData.propertyHasEpc) {
      router.push(`/questionnaire?step=6`)
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }

  // list of options from A to H
  const councilTaxBands = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(65 + i)
  ).map((option) => <option key={option}>{option}</option>)

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
          What is the council tax band of your property?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup error={submitCount > 0 && !!errors?.councilTaxBand?.message}>
          <GovUK.Label mb={4}>
            {submitCount > 0 && errors?.councilTaxBand?.message && (
              <GovUK.ErrorText>{errors?.councilTaxBand.message}</GovUK.ErrorText>
            )}

            <GovUK.Select
              mb={8}
              label="Select your council tax band"
              input={register('councilTaxBand', {
                required: {
                  value: true,
                  message: 'This field is required'
                }
              })}
            >
              <option value="">Please select...</option>
              {councilTaxBands}
            </GovUK.Select>
          </GovUK.Label>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.gov.uk/council-tax-bands"
            style={{ marginTop: '-40px', display: 'flex' }}
          >
            Check your property’s council tax band
          </Link>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
