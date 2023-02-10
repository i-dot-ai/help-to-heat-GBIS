import { createContext, PropsWithChildren, useState } from 'react'

export type Questions = {
  monthlySpending: number | null
  currentEnergySources: string[] | null
  currentEnergySystems: string[] | null
  interestedInRenewables: boolean | null
  primaryReason: string | null
  usesRenewables: boolean | null
}

const questionnaire = {
  data: {} as Questions,
  save: (_data: Partial<Questions>): void => undefined
}

export const QuestionnaireContext = createContext(questionnaire)

export const QuestionnaireContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Questions>({
    monthlySpending: null,
    currentEnergySources: null,
    currentEnergySystems: null,
    interestedInRenewables: null,
    primaryReason: null,
    usesRenewables: null
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
