import { Questions } from '@/context/QuestionnaireContext'

export const persistData = (data: Questions) => {
  const base64Encoded = btoa(JSON.stringify(data))
  localStorage.setItem('data', base64Encoded)
  return base64Encoded
}

export const readPersistedData = () => {
  const data = localStorage.getItem('data')
  if (data) {
    const decodedObject = JSON.parse(atob(data))
    return decodedObject
  }
  return null
}
