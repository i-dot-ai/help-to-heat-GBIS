import { BackLink, Page } from 'govuk-react'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, ReactNode } from 'react'

const Layout = ({
  children,
  beforeChildren,
  showBackButton = false
}: PropsWithChildren<{ beforeChildren?: JSX.Element; showBackButton?: boolean }>) => {
  const router = useRouter()

  return (
    <Page
      beforeChildren={
        beforeChildren ??
        (showBackButton && (
          <BackLink
            href="/"
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
          >
            Back
          </BackLink>
        ))
      }
    >
      {children}
    </Page>
  )
}

export default Layout
