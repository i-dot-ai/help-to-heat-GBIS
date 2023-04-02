import React from 'react'
import fs from 'fs'
import path from 'path'

const loadTranslations = (locale) => {
  const translations = {}

  const translationFiles = fs.readdirSync(
    path.join(process.cwd(), 'public/locales', locale)
  )

  translationFiles.forEach((file) => {
    const namespace = path.basename(file, '.json')
    const fileContent = fs.readFileSync(
      path.join(process.cwd(), 'public/locales', locale, file)
    )
    translations[namespace] = JSON.parse(fileContent)
  })

  return translations
}

const translations = loadTranslations('en')

const appWithTranslation = (Component) => {
  return function WithTranslationWrapper(props) {
    return <Component {...props} />
  }
}

const useTranslation = (ns) => {
  const t = (key) => {
    const namespace = ns || 'common'
    if (translations[namespace] && translations[namespace][key]) {
      return translations[namespace][key]
    }
    return key
  }

  return {
    t,
    i18n: {
      changeLanguage: () => new Promise(() => {})
    }
  }
}

const Trans = ({ children }) => <>{children}</>

module.exports = {
  appWithTranslation,
  useTranslation,
  Trans
}
