import { BackLink, Page, PhaseBanner } from 'govuk-react'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

const Layout = ({
  children,
  showBackButton = false
}: PropsWithChildren<{ beforeChildren?: JSX.Element; showBackButton?: boolean }>) => {
  const router = useRouter()

  return (
    <Page
      beforeChildren={
        <span className="print-hidden">
          <PhaseBanner level="alpha">
            This is a new service – your feedback will help us to improve it.
          </PhaseBanner>
          {!!showBackButton && (
            <BackLink
              href="/"
              onClick={(e) => {
                e.preventDefault()
                router.back()
              }}
            >
              Back
            </BackLink>
          )}
        </span>
      }
    >
      {children}
    </Page>
  )
}

export default Layout
