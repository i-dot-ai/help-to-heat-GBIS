import { QuestionnaireContext } from '@/context/QuestionnaireContext'
import { Steps } from '@/pages/questionnaire'
import { Caption, Heading } from 'govuk-react'
import { useContext } from 'react'
import { CurrentEnergySources } from './CurrentEnergySources'
import { CurrentEnergySystems } from './CurrentEnergySystems'
import { MonthlySpending } from './MonthlySpending'

const CurrentStep = ({ steps }: { steps: Steps }) => {
  return (
    <div>
      <Caption size="L">
        Question {steps.currentStep} of {steps.totalSteps}
      </Caption>
    </div>
  )
}

const QuestionnaireForm = ({ steps }: { steps: Steps }) => {
  const { data } = useContext(QuestionnaireContext)
  return (
    <div>
      <CurrentStep steps={steps} />
      {steps.currentStep === 1 && <MonthlySpending />}
      {steps.currentStep === 2 && <CurrentEnergySources />}
      {steps.currentStep === 3 && <CurrentEnergySystems />}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default QuestionnaireForm
