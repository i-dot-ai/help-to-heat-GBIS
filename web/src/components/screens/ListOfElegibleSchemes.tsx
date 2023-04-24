import React from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from '@/components/ui/Button'

export const ListOfElegibleSchemes = (props: { onSubmit: () => void }) => {
  const { t } = useTranslation(['screens'])
  return (
    <div>
      <h1>{t('ListOfElegibleSchemes.title')}</h1>
      <Button
        type="button"
        onClick={() => {
          props.onSubmit()
        }}
      >
        {
          t('continue', {
            ns: 'common'
          }) as string
        }
      </Button>
    </div>
  )
}
