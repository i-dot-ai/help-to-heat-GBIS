import { useRouter } from 'next/router'
import React from 'react'

const D = () => {
  const router = useRouter()

  if (router.query.p !== 'foobar1122') {
    return null
  }

  return (
    <div>
      <pre>{JSON.stringify(process.env.PORTAL_URL, null, 2)}</pre>
      <pre>{JSON.stringify(process.env.UPRN_API_KEY, null, 2)}</pre>
      <pre>{JSON.stringify(process.env.IS_DEV, null, 2)}</pre>
    </div>
  )
}

export default D
