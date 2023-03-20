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
  councilTaxBand?: string
  propertyHasEpc: boolean | null
  suggestedEPCIsCorrect?: string
  propertyEpcRating?: string
  propertyEpcDateOfCertificate: {
    year?: string | number | undefined
    month?: string | number | undefined
    day?: string | number | undefined
  }
  offGasGrid: boolean | null
  benefits?: 'Yes' | 'No'
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
  const [smartEPCcheckPerformed, setSmartEPCcheckPerformed] = useState(false)
  const [data, setData] = useState<Questions>({
    location: '',
    owningOfProperty: '',
    address: {
      postcode: '',
      buildingNumberOrName: ''
    },
    propertyHasEpc: null,
    propertyEpcDateOfCertificate: {
      year: '',
      month: '',
      day: ''
    },
    offGasGrid: null,
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

  useEffect(() => {
    if (!!data.addressUPRN && !smartEPCcheckPerformed) {
      setSmartEPCcheckPerformed(true)
      fetch(`/api/epc?uprn=${data.addressUPRN}`)
        .then((r) => r.json())
        .then((r) => {
          if (r.rating && r.date) {
            const _date = new Date(r.date)
            setData((v) => {
              return {
                ...v,
                propertyHasEpc: true,
                propertyEpcRating: r.rating,
                propertyEpcDateOfCertificate: {
                  year: _date.getFullYear(),
                  month: _date.getMonth() + 1,
                  day: _date.getDate()
                }
              }
            })
          }
        })
    }
  }, [data, smartEPCcheckPerformed])

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
