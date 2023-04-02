import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uprn } = req.query
  const PORTAL_URL = process.env.PORTAL_URL

  if (!uprn) {
    res.status(400).json({ message: 'Bad request' })
    return
  }

  const { rating, date } = await fetch(`${PORTAL_URL}/api/epc-rating/${uprn}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      return response.json()
    })
    .then((r) => {
      if (r.errors) {
        return {
          uprn,
          rating: '',
          date: ''
        }
      }

      return r
    })
    .catch((_e) => {
      // TODO: Log error w/ Sentry
      return {
        uprn,
        rating: '',
        date: ''
      }
    })

  res.status(200).json({
    rating,
    date
  })
}

export default handler
