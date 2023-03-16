import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uprn } = req.query
  const PORTAL_URL = process.env.PORTAL_URL

  if (!uprn) {
    res.status(400).json({ message: 'Bad request' })
    return
  }

  const { rating, date } = await fetch(`${PORTAL_URL}/api/epc-rating/${uprn}/`, {
    // const { rating, date } = await fetch(`${PORTAL_URL}/api/epc-rating/289495275833/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  })

  res.status(200).json({
    rating,
    date
  })
  return
}

export default handler
