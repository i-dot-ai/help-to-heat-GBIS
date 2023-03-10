import { NextApiRequest, NextApiResponse } from 'next'
const key = process.env.UPRN_API_KEY

interface PlacesResponse {
  header: {
    uri: string
    query: string
    offset: number
    totalresults: number
    format: string
    dataset: string
    lr: string
    maxresults: number
    matchprecision: number
    epoch: string
    lastupdate: Date
    output_srs: string
  }
  results: {
    DPA: {
      UPRN: string
      UDPRN: string
      ADDRESS: string
      ORGANISATION_NAME: string
      BUILDING_NUMBER: string
      THOROUGHFARE_NAME: string
      DEPENDENT_LOCALITY: string
      POST_TOWN: string
      POSTCODE: string
      RPC: string
      X_COORDINATE: number
      Y_COORDINATE: number
      STATUS: string
      LOGICAL_STATUS_CODE: string
      CLASSIFICATION_CODE: string
      CLASSIFICATION_CODE_DESCRIPTION: string
      LOCAL_CUSTODIAN_CODE: number
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: string
      COUNTRY_CODE: string
      COUNTRY_CODE_DESCRIPTION: string
      POSTAL_ADDRESS_CODE: string
      POSTAL_ADDRESS_CODE_DESCRIPTION: string
      BLPU_STATE_CODE: string
      BLPU_STATE_CODE_DESCRIPTION: string
      TOPOGRAPHY_LAYER_TOID: string
      LAST_UPDATE_DATE: string
      ENTRY_DATE: string
      BLPU_STATE_DATE: string
      LANGUAGE: string
      MATCH: number
      MATCH_DESCRIPTION: string
      DELIVERY_POINT_SUFFIX: string
    }
  }[]
}

const filterResults = (data: PlacesResponse) => {
  if (data?.results?.length) {
    return data.results.map((result) => ({
      uprn: result.DPA.UPRN,
      postcode: result.DPA.POSTCODE,
      address: result.DPA.ADDRESS
    }))
  }
  return []
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, postcode } = req.query

  if (!address && !postcode) {
    res.status(400).json({ message: 'Bad request' })
    return
  }

  if (postcode) {
    const response = await fetch(
      `https://api.os.uk/search/places/v1/postcode?postcode=${postcode}&key=${key}`
    )
    const data = await response.json()
    const results = filterResults(data)
    res.status(200).json(results)
    return
  } else if (address) {
    const response = await fetch(
      `https://api.os.uk/search/places/v1/find?maxresults=1&query=${address}&key=${key}`
    )
    const data = await response.json()
    const results = filterResults(data)
    res.status(200).json(results)
    return
  }

  res.status(404).json({ message: 'Not found' })
}

export default handler
