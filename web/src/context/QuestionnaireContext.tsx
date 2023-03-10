import { persistData } from '@/lib/storage'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

export type Questions = {
  location: string
  owningOfProperty: string
  address?: {
    postcode?: string
    buildingNumberOrName?: string
  }
  addressUPRN?: string
  propertyHasEpc: boolean | null
  propertyEpcRating: string
  propertyEpcDateOfCertificate: {
    year?: string | number | undefined
    month?: string | number | undefined
    day?: string | number | undefined
  }
  offGasGrid: boolean | null
  benefits: boolean | null
  householdIncome: string
  secondaryQuestionsOnProperty: string[]
  landlordPermission: boolean | null
  energySupplier: string
  personalDetails: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
  }
  kindOfProperty: string | null
  kindOfPropertyHouse: string | null
  kindOfPropertyBungalow: string | null
  kindOfPropertyFlat: string | null
  numberOfBedrooms: number | null
  loftInsulation?: string
  accessToLoft?: string
  loft?: string
  wallInsulation?: string
  propertyWalls?: string
}

const questionnaire = {
  data: {} as Questions,
  save: (_data: Partial<Questions>): void => undefined
}

export const QuestionnaireContext = createContext(questionnaire)

export const QuestionnaireContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Questions>({
    location: '',
    owningOfProperty: '',
    address: {
      postcode: '',
      buildingNumberOrName: ''
    },
    addressUPRN: '',
    propertyHasEpc: null,
    propertyEpcRating: '',
    propertyEpcDateOfCertificate: {
      year: '',
      month: '',
      day: ''
    },
    offGasGrid: null,
    benefits: null,
    householdIncome: '',
    secondaryQuestionsOnProperty: [],
    landlordPermission: null,
    energySupplier: '',
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    },
    kindOfProperty: null,
    kindOfPropertyHouse: null,
    kindOfPropertyBungalow: null,
    kindOfPropertyFlat: null,
    numberOfBedrooms: null
  })

  useEffect(() => {
    if (data) {
      persistData(data)
    }
  }, [data])

  // DISABLED FOR NOW (DEV)
  // useEffect(() => {
  //   const data = readPersistedData()
  // }, [])

  const saveData = (data: Partial<Questions>) => {
    setData((v) => {
      return { ...v, ...data }
    })
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        data,
        save: (data) => saveData(data)
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  )
}
