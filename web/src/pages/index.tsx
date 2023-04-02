import Layout from '@/components/Layout'
import { Button, GridCol, GridRow, H1 } from 'govuk-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

const NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { t } = useTranslation(['common'])

  useEffect(() => {
    router.prefetch('/questionnaire')
  }, [router])
  return (
    <Layout>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1 size={'L'}>{t('title')}</H1>

          <Button
            start
            onClick={() => {
              router.push('/questionnaire')
            }}
          >
            {t('start-now')}
          </Button>
        </GridCol>
        <GridCol setWidth="one-third">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontSize: '14px'
            }}
          >
            <Link href="/" locale="en">
              English locale
            </Link>
            <Link href="/" locale="cy">
              Welsh locale
            </Link>
          </div>
        </GridCol>
      </GridRow>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common'])

  return {
    props: {
      ...translations
    }
  }
}

export default NextPage
