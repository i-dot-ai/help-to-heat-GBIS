export type EpcRatingType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type YesNoType = 'yes' | 'no'
export type LocationType = 'England' | 'Scotland' | 'Wales' | 'Northern Ireland'
export type HousingStatusType = 'owner' | 'tenant' | 'social-tenant' | 'landlord'
export type CouncilTaxBandType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'
export type ReceivingBenefitsType = YesNoType
export type HouseholdIncomeType = '<£31k' | '>£31k'
export type PropertyType = 'house' | 'bungalow' | 'apartment'
export type HouseType = 'detached' | 'semi-detached' | 'terraced' | 'end-terrace'
export type BungalowType = 'detached' | 'semi-detached' | 'terraced' | 'end-terrace'
export type FlatType = 'top-floor' | 'middle-floor' | 'ground-floor'
export type NumberOfBedroomsType = 'studio' | '1' | '2' | '3+'
export type WallType = 'solid' | 'cavity' | 'mix' | 'not-listed' | 'unknown'
export type WallInsulationType = 'all' | 'some' | 'none' | 'unknown'
export type LoftType = YesNoType
export type LoftAccessType = YesNoType
export type LoftInsulationType = YesNoType | 'unknown'
export type EnergySupplierType = string

export type PersonalDetailsType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export type LandlordPermissionType = YesNoType
export type SuggestedEPCIsCorrectType = YesNoType
export type PropertyHasEPCType = YesNoType
export type PropertyEPCDetailsType = {
  propertyEpcRating: EpcRatingType
  propertyEpcDate: {
    day: string
    month: string
    year: string
  }
}
export type PropertyAddressType = {
  postcode: string
  buildingNumberOrName: string
}

export type SuggestedAddressType = {
  address: string
  postcode: string
  uprn: string
}

export type AddressUPRNType = string
