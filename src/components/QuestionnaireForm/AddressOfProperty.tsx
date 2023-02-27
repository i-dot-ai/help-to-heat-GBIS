import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext, Questions } from '@/context/QuestionnaireContext'
import { UnorderedList, ListItem, Paragraph } from 'govuk-react'
import styled from 'styled-components'

const InputContainer = styled.div`
  width: 250px;
`

type Inputs = Pick<Questions, 'address'>

export const AddressOfProperty = ({ nextStep }: { nextStep: number }) => {
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

  const supplierNotSupported = false

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    save(data)
    if (supplierNotSupported) {
      router.push('/supplier-not-participating')
    } else {
      router.push(`/questionnaire?step=${nextStep}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          What is the address of your property?
        </GovUK.Fieldset.Legend>

        <GovUK.FormGroup>
          <GovUK.Label mb={4}>
            <Paragraph>We need this information to find out the following: </Paragraph>
            <UnorderedList>
              <ListItem>the energy efficiency of your home</ListItem>
              <ListItem>who your local authority could be</ListItem>
              <ListItem>if you live in an eligible postcode</ListItem>
            </UnorderedList>

            <InputContainer>
              <GovUK.InputField
                mb={4}
                hint="e.g. 19 or Swiss Cottage"
                meta={{
                  touched: submitCount > 0,
                  error: errors?.address?.buildingNumberOrName?.message
                }}
                input={register('address.buildingNumberOrName', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                })}
              >
                Building number or name
              </GovUK.InputField>

              <GovUK.InputField
                mb={4}
                hint="e.g AB12 3CD"
                meta={{
                  touched: submitCount > 0,
                  error: errors?.address?.postcode?.message
                }}
                input={register('address.postcode', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                })}
              >
                Postcode
              </GovUK.InputField>
            </InputContainer>
          </GovUK.Label>
        </GovUK.FormGroup>
      </GovUK.Fieldset>

      <GovUK.Button type="submit">Continue</GovUK.Button>
    </form>
  )
}
