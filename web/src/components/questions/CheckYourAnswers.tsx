import React from 'react'
import { useTranslation } from 'next-i18next'
import * as GovUK from 'govuk-react'
import {
  AddressUPRNType,
  BungalowType,
  CouncilTaxBandType,
  FlatType,
  HouseholdIncomeType,
  HouseType,
  HousingStatusType,
  LocationType,
  LoftAccessType,
  LoftInsulationType,
  LoftType,
  NumberOfBedroomsType,
  PropertyAddressType,
  PropertyEPCDetailsType,
  PropertyHasEPCType,
  PropertyType,
  ReceivingBenefitsType,
  SuggestedEPCIsCorrectType,
  WallInsulationType,
  WallType
} from '@/types'
import { GO_TO_QUESTION_TYPE } from '@/questionnaireMachine'

export const CheckYourAnswers = (props: {
  onSubmit: () => void
  onGoToQuestion: (location: GO_TO_QUESTION_TYPE) => void
  answers: {
    location: LocationType
    housingStatus: HousingStatusType
    address: PropertyAddressType
    addressUPRN: AddressUPRNType
    councilTaxBand: CouncilTaxBandType
    suggestedEPCIsCorrect: SuggestedEPCIsCorrectType
    propertyHasEpc?: PropertyHasEPCType
    propertyEpcDetails?: PropertyEPCDetailsType
    receivingBenefits: ReceivingBenefitsType
    householdIncome: HouseholdIncomeType
    property: PropertyType
    house: HouseType
    bungalow: BungalowType
    flat: FlatType
    numberOfBedrooms: NumberOfBedroomsType
    walls: WallType
    wallInsulation: WallInsulationType
    loft: LoftType
    loftAccess: LoftAccessType
    loftInsulation: LoftInsulationType
  }
}) => {
  const { t } = useTranslation(['questionnaire'])
  return (
    <div>
      <GovUK.Fieldset>
        <GovUK.Fieldset.Legend size="L">
          {t('CheckYourAnswers.title')}
        </GovUK.Fieldset.Legend>

        <GovUK.Paragraph>{t('CheckYourAnswers.description') as string}</GovUK.Paragraph>

        <GovUK.Table>
          <GovUK.Table.Row>
            <GovUK.Table.Cell setWidth="one-third" bold>
              {t('CheckYourAnswers.country.title')}
            </GovUK.Table.Cell>
            <GovUK.Table.Cell>{props.answers.location}</GovUK.Table.Cell>
            <GovUK.Table.Cell>
              <GovUK.Link
                href="/questionnaire?step=1"
                onClick={(e) => {
                  e.preventDefault()
                  props.onGoToQuestion('GO_TO_PROPERTY_LOCATION')
                }}
              >
                {
                  t('change', {
                    ns: 'common'
                  }) as string
                }
              </GovUK.Link>
            </GovUK.Table.Cell>
          </GovUK.Table.Row>
        </GovUK.Table>
      </GovUK.Fieldset>

      <GovUK.Button
        type="button"
        onClick={() => {
          props.onSubmit()
        }}
      >
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </GovUK.Button>
    </div>
  )
}
