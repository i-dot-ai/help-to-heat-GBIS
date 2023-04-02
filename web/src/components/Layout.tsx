import { Page, PhaseBanner, WarningText } from 'govuk-react'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation(['common'])
  const { locale } = useRouter()
  return (
    <Page
      beforeChildren={
        <span className="print-hidden">
          <PhaseBanner level={t('service-level')}>{t('service-disclaimer')}</PhaseBanner>
        </span>
      }
    >
      {locale === 'cy' && (
        <div
          style={{
            marginBottom: '32px'
          }}
        >
          <WarningText>Welsh copy is under development</WarningText>
        </div>
      )}
      {children}
    </Page>
  )
}

export default Layout
