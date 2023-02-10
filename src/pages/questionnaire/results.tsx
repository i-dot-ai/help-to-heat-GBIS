import Layout from '@/components/Layout'
import QuestionnaireForm from '@/components/QuestionnaireForm/QuestionnaireForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export type Steps = { totalSteps: number; currentStep: number }

export default function ResultsPage() {
  return (
    <div>
      <h1>Thank you</h1>
    </div>
  )
}
ResultsPage.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>
