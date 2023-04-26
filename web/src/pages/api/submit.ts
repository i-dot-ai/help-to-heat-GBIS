import { NextApiRequest, NextApiResponse } from 'next'

function flattenJSON(json: object, prefix = ''): object {
  const flattened: { [key: string]: any } = {}

  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      const value = (json as any)[key]

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        const nestedObject = flattenJSON(value, newKey)
        for (const nestedKey in nestedObject) {
          if (Object.prototype.hasOwnProperty.call(nestedObject, nestedKey)) {
            flattened[nestedKey] = (nestedObject as any)[nestedKey]
          }
        }
      } else {
        flattened[newKey] = value
      }
    }
  }

  return flattened
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = req.body
    const PORTAL_URL = process.env.PORTAL_URL

    const flattenedData = flattenJSON(data)

    const response = await fetch(`${PORTAL_URL}/api/referral/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: flattenedData })
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
