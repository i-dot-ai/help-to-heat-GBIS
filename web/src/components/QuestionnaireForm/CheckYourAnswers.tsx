import React, { useContext } from 'react'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
import { QuestionnaireContext } from '@/context/QuestionnaireContext'
import { Link, Paragraph, Table } from 'govuk-react'

export const CheckYourAnswers = ({ nextStep }: { nextStep: number }) => {
  const { data } = useContext(QuestionnaireContext)
  const router = useRouter()

  return (
    <div>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">Check your answers</GovUK.Fieldset.Legend>

        <Paragraph>
          Please review the information we have gathered. You can still change your
          answers if anything looks wrong.
        </Paragraph>

        <Table>
          <Table.Row>
            <Table.Cell setWidth="one-third" bold>
              Which country is your property located in?
            </Table.Cell>
            <Table.Cell>{data.location}</Table.Cell>
            <Table.Cell>
              <Link
                href="/questionnaire?step=1"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/questionnaire?step=1`)
                }}
              >
                Change
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell setWidth="one-third" bold>
              Do you own your property?
            </Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>
              <Link
                href="/questionnaire?step=2"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/questionnaire?step=2`)
                }}
              >
                Change
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell setWidth="one-third" bold>
              What is the address of your property?
            </Table.Cell>
            <Table.Cell>
              {data?.address?.buildingNumberOrName} {data?.address?.postcode}
            </Table.Cell>
            <Table.Cell>
              <Link
                href="/questionnaire?step=3"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/questionnaire?step=3`)
                }}
              >
                Change
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell setWidth="one-third" bold>
              Do you have a gas boiler?
            </Table.Cell>
            <Table.Cell>{data.offGasGrid}</Table.Cell>
            <Table.Cell>
              <Link
                href="/questionnaire?step=6"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/questionnaire?step=5`)
                }}
              >
                Change
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell setWidth="one-third" bold>
              What is your household income?
            </Table.Cell>
            <Table.Cell>{data.householdIncome}</Table.Cell>
            <Table.Cell>
              <Link
                href="/questionnaire?step=8"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/questionnaire?step=8`)
                }}
              >
                Change
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table>
      </GovUK.Fieldset>

      <GovUK.Button
        type="button"
        onClick={() => {
          router.push(`/questionnaire?step=${nextStep}`)
        }}
      >
        Continue
      </GovUK.Button>
    </div>
  )
}
