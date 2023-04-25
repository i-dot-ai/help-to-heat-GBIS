import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = req.body
    const PORTAL_URL = process.env.PORTAL_URL

    const response = await fetch(`${PORTAL_URL}/api/referral/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error)
    }

    res.status(200).json({
      message: 'Success'
    })
  } catch (error) {
    // TODO: Log error w/ Sentry
    res.status(500).json({
      message: 'Something went wrong, please try again'
    })
  }
}

export default handler
