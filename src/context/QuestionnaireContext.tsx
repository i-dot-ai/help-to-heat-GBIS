import { createContext, PropsWithChildren, useState } from 'react'

export type Questions = {
  location: string
  owningOfProperty: string
  address: {
    postcode: string
    buildingNumberOrName: string
  }
  propertyHasEpc: boolean | null
  propertyEpc: string
  offGasGrid: boolean | null
  benefits: string[]
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
    propertyHasEpc: null,
    propertyEpc: '',
    offGasGrid: null,
    benefits: [],
    householdIncome: '',
    secondaryQuestionsOnProperty: [],
    landlordPermission: null,
    energySupplier: '',
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  })

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
