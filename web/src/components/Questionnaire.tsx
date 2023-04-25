import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'

import type {
  AddressUPRNType,
  BungalowType,
  CouncilTaxBandType,
  EnergySupplierType,
  FlatType,
  HouseholdIncomeType,
  HouseType,
  HousingStatusType,
  LandlordPermissionType,
  LocationType,
  LoftAccessType,
  LoftInsulationType,
  LoftType,
  NumberOfBedroomsType,
  PersonalDetailsType,
  PropertyAddressType,
  PropertyEPCDetailsType,
  PropertyHasEPCType,
  PropertyType,
  ReceivingBenefitsType,
  SuggestedEPCIsCorrectType,
  WallInsulationType,
  WallType
} from '@/types'

import { GO_TO_QUESTION_TYPE, questionnaireMachine } from '@/questionnaireMachine'

// Questions
import { CountryOrProperty } from '@/components/questions/CountryOrProperty'
import { OwningOfProperty } from '@/components/questions/OwningOfProperty'
import { AddressOfProperty } from '@/components/questions/AddressOfProperty'
import { AdressOfPropertyList } from '@/components/questions/AdressOfPropertyList'
import { CouncilTaxBand } from '@/components/questions/CouncilTaxBand'
import { Benefits } from '@/components/questions/Benefits'
import { HouseholdIncome } from '@/components/questions/HouseholdIncome'
import { KindOfProperty } from '@/components/questions/KindOfProperty'
import { KindOfPropertyBungalow } from '@/components/questions/KindOfPropertyBungalow'
import { KindOfPropertyFlat } from '@/components/questions/KindOfPropertyFlat'
import { KindOfPropertyHouse } from '@/components/questions/KindOfPropertyHouse'
import { NumberOfBedrooms } from '@/components/questions/NumberOfBedrooms'
import { Loft } from '@/components/questions/Loft'
import { PropertyWalls } from '@/components/questions/PropertyWalls'
import { WallInsulation } from '@/components/questions/WallInsulation'
import { AccessToLoft } from '@/components/questions/AccessToLoft'
import { LoftInsulation } from '@/components/questions/LoftInsulation'
import { CheckYourAnswers } from '@/components/questions/CheckYourAnswers'
import { ChooseSupplier } from '@/components/questions/ChooseSupplier'
import { ConfirmAndSubmit } from '@/components/questions/ConfirmAndSubmit'
import { LandlordPermission } from '@/components/questions/LandlordPermission'
import { PersonalAndContactDetails } from '@/components/questions/PersonalAndContactDetails'
import { FoundEPC } from '@/components/questions/FoundEPC'
import { AskAboutEPC } from '@/components/questions/AskAboutEPC'
import { PropertyEPC } from '@/components/questions/PropertyEPC'

// Messages
import { LocalCouncilSupport } from '@/components/screens/LocalCouncilSupport'
import { PropertyIneligible } from '@/components/screens/PropertyIneligible'
import { IneligibleCountry } from '@/components/screens/IneligibleCountry'
import { AddressNotFound } from '@/components/screens/AddressNotFound'
import { ListOfElegibleSchemes } from '@/components/screens/ListOfElegibleSchemes'
import { Success } from '@/components/screens/Success'
import { useRouter } from 'next/router'
import { StateFrom } from 'xstate'

const IS_DEV = process.env.IS_DEV

const Questionnaire = (props: {
  initialState?: StateFrom<typeof questionnaireMachine>
}) => {
  const { locale } = useRouter()

  const [state, send, service] = useMachine(questionnaireMachine, {
    state: props.initialState
  })
  const { t } = useTranslation(['common', 'questionnaire'])

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      localStorage.setItem('qs', JSON.stringify(state))
    })

    return subscription.unsubscribe
  }, [service])

  return (
    <div>
      {state.matches('property_location') && (
        <GovUK.BackLink href={`/${locale}`}>{t('back')}</GovUK.BackLink>
      )}

      {!state.matches('property_location') && !state.matches('complete') && (
        <GovUK.BackLink
          href={`/${locale}`}
          onClick={(e) => {
            e.preventDefault()
            send('PREVIOUS')
          }}
        >
          {t('back')}
        </GovUK.BackLink>
      )}

      {state.matches('property_location') && (
        <CountryOrProperty
          onSubmit={(response: LocationType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            location: state.context.location
          }}
        />
      )}
      {state.matches('property_ownership') && (
        <OwningOfProperty
          onSubmit={(response: HousingStatusType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            housingstatus: state.context.housingStatus
          }}
        />
      )}
      {state.matches('property_address') && (
        <AddressOfProperty
          onSubmit={(response: PropertyAddressType) => {
            send({
              type: 'ANSWER',
              payload: JSON.stringify(response)
            })
          }}
          defaultValues={{
            address: state.context.address
          }}
        />
      )}

      {state.matches('property_address_finder_loading') && (
        <p>property_address_finder_loading</p>
      )}
      {state.matches('property_address_finder_error') && <AddressNotFound />}
      {state.matches('property_address_select') && (
        <AdressOfPropertyList
          onSubmit={(response: AddressUPRNType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            addressUPRN: state.context.addressUPRN
          }}
          suggestedAddresses={state.context.suggestedAddresses}
        />
      )}

      {state.matches('ineligible_country') && (
        <IneligibleCountry location={state.context.location} />
      )}

      {state.matches('property_suggested_epc_loading') && (
        <div>property_suggested_epc_loading</div>
      )}

      {state.matches('property_council_tax') && (
        <CouncilTaxBand
          onSubmit={(response: CouncilTaxBandType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            counciltaxBand: state.context.councilTaxBand
          }}
          counciltaxBandsSize={state.context.counciltaxBandsSize}
        />
      )}

      {state.matches('epc_found') && (
        <FoundEPC
          onSubmit={(response: SuggestedEPCIsCorrectType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            suggestedEPCIsCorrect: state.context.suggestedEPCIsCorrect
          }}
        />
      )}
      {state.matches('epc_does_owner_have_details') && (
        <AskAboutEPC
          onSubmit={(response: PropertyHasEPCType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            propertyHasEpc: state.context.propertyHasEpc
          }}
        />
      )}
      {state.matches('epc_request_details') && (
        <PropertyEPC
          onSubmit={(response: PropertyEPCDetailsType) => {
            send({
              type: 'ANSWER',
              payload: JSON.stringify(response)
            })
          }}
          defaultValues={{
            propertyEpcDetails: state.context.propertyEpcDetails
          }}
        />
      )}

      {state.matches('epc_not_eligible') && <PropertyIneligible />}

      {state.matches('receiving_benefits') && (
        <Benefits
          onSubmit={(response: ReceivingBenefitsType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            receivingBenefits: state.context.receivingBenefits
          }}
        />
      )}
      {state.matches('household_income') && (
        <HouseholdIncome
          onSubmit={(response: HouseholdIncomeType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            householdIncome: state.context.householdIncome
          }}
        />
      )}

      {state.matches('local_council_support') && (
        <LocalCouncilSupport
          onSubmit={() => {
            send({
              type: 'CONTINUE'
            })
          }}
        />
      )}
      {state.matches('kind_of_property') && (
        <KindOfProperty
          onSubmit={(response: PropertyType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            property: state.context.property
          }}
        />
      )}

      {state.matches('kind_of_property_house') && (
        <KindOfPropertyHouse
          onSubmit={(response: HouseType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            house: state.context.house
          }}
        />
      )}
      {state.matches('kind_of_property_bungalow') && (
        <KindOfPropertyBungalow
          onSubmit={(response: BungalowType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            bungalow: state.context.bungalow
          }}
        />
      )}
      {state.matches('kind_of_property_flat') && (
        <KindOfPropertyFlat
          onSubmit={(response: FlatType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            flat: state.context.flat
          }}
        />
      )}
      {state.matches('number_of_bedrooms') && (
        <NumberOfBedrooms
          onSubmit={(response: NumberOfBedroomsType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            numberOfBedrooms: state.context.numberOfBedrooms
          }}
        />
      )}

      {state.matches('property_walls') && (
        <PropertyWalls
          onSubmit={(response: WallType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            walls: state.context.walls
          }}
        />
      )}

      {state.matches('wall_insulation') && (
        <WallInsulation
          onSubmit={(response: WallInsulationType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            wallInsulation: state.context.wallInsulation
          }}
        />
      )}

      {state.matches('loft') && (
        <Loft
          onSubmit={(response: LoftType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            loft: state.context.loft
          }}
        />
      )}

      {state.matches('access_to_loft') && (
        <AccessToLoft
          onSubmit={(response: LoftAccessType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            loftAccess: state.context.loftAccess
          }}
        />
      )}

      {state.matches('loft_insulation') && (
        <LoftInsulation
          onSubmit={(response: LoftInsulationType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            loftInsulation: state.context.loftInsulation
          }}
        />
      )}
      {state.matches('check_your_answers') && (
        <CheckYourAnswers
          onSubmit={() => {
            send({
              type: 'CONTINUE'
            })
          }}
          onGoToQuestion={(location: GO_TO_QUESTION_TYPE) => {
            send({
              type: location
            })
          }}
          answers={state.context}
        />
      )}

      {state.matches('list_of_elegible_schemes') && (
        <ListOfElegibleSchemes
          onSubmit={() => {
            send({
              type: 'CONTINUE'
            })
          }}
        />
      )}

      {state.matches('choose_supplier') && (
        <ChooseSupplier
          onSubmit={(response: EnergySupplierType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            energySupplier: state.context.energySupplier
          }}
        />
      )}
      {state.matches('landlord_permission') && (
        <LandlordPermission
          onSubmit={(response: LandlordPermissionType) => {
            send({
              type: 'ANSWER',
              payload: response
            })
          }}
          defaultValues={{
            landlordPermission: state.context.landlordPermission
          }}
        />
      )}
      {state.matches('personal_and_contact_details') && (
        <PersonalAndContactDetails
          onSubmit={(response: PersonalDetailsType) => {
            send({
              type: 'ANSWER',
              payload: JSON.stringify(response)
            })
          }}
          defaultValues={{
            personalDetails: state.context.personalDetails
          }}
        />
      )}
      {state.matches('confirm_and_submit') && (
        <ConfirmAndSubmit
          onSubmit={() => {
            send({
              type: 'CREATE_LEAD'
            })
          }}
        />
      )}

      {state.matches('confirm_and_submit_loading') && (
        <div>confirm_and_submit_loading</div>
      )}

      {state.matches('confirm_and_submit_error') && <div>confirm_and_submit_error</div>}

      {state.matches('complete') && <Success referenceNumber="HDJ2123F" />}
      {IS_DEV && <pre>{JSON.stringify(state.context, null, 2)}</pre>}
    </div>
  )
}

export default Questionnaire
