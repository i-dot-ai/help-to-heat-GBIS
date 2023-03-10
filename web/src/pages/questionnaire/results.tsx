import Layout from '@/components/Layout'
export type Steps = { totalSteps: number; currentStep: number }

export default function ResultsPage() {
  return (
    <div>
      <h1>Thank you</h1>
    </div>
  )
}
ResultsPage.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>
