import Layout from '@/components/Layout'
import QuestionnaireForm from '@/components/QuestionnaireForm/QuestionnaireForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export type Steps = { totalSteps: number; currentStep: number }

export default function Questionnaire() {
  const router = useRouter()

  const [steps, setSteps] = useState<Steps>({
    currentStep: 1,
    totalSteps: 3
  })

  useEffect(() => {
    if (router.isReady) {
      const step = router.query.step
      if (step) {
        setSteps((v) => ({ ...v, currentStep: Number(step) }))
      }
    }
  }, [router])

  return <QuestionnaireForm steps={steps} />
}
Questionnaire.getLayout = (page: JSX.Element) => <Layout showBackButton>{page}</Layout>
