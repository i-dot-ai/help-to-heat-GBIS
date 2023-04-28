import React from 'react'
import * as GovUK from 'govuk-react'
import { useTranslation } from 'next-i18next'
import { Button } from '@/components/ui/Button'

export const AddressEPCNotFound = (props: { onSubmit: () => void }) => {
  const { t } = useTranslation(['screens'])
  return (
    <>
      <GovUK.Heading size="LARGE">
        We did not find a complete Energy Performance Certificate for your property
      </GovUK.Heading>
      <GovUK.Paragraph>This could be because:</GovUK.Paragraph>

      <GovUK.UnorderedList>
        <GovUK.ListItem>there isn’t an EPC for your property </GovUK.ListItem>
        <GovUK.ListItem>your property is a new build </GovUK.ListItem>
        <GovUK.ListItem>your address is saved in a different format..</GovUK.ListItem>
      </GovUK.UnorderedList>

      <GovUK.Paragraph>
        You can continue without an Energy Performance Certificate. We will need to ask
        you some questions to work out which home improvement schemes your property is
        eligible for. There will be guidance to support you along the way.
      </GovUK.Paragraph>

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
    </>
  )
}
