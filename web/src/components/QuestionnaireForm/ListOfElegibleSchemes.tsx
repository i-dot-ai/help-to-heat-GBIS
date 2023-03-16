import React from 'react'
import * as GovUK from 'govuk-react'
import { useRouter } from 'next/router'
const ListOfElegibleSchemes = ({ nextStep }: { nextStep: number }) => {
  const router = useRouter()
  return (
    <div>
      <h1>You may be eligible for the following</h1>
      <GovUK.Button
        type="button"
        onClick={() => {
          router.push(`/questionnaire?step=${nextStep}`)
        }}
      >
        Continue
      </GovUK.Button>
    </div>
  )
}

export default ListOfElegibleSchemes
