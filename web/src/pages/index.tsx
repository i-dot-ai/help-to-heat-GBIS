import Layout from '@/components/Layout'
import {
  Button,
  GridCol,
  GridRow,
  H1,
  H3,
  Link,
  ListItem,
  Paragraph,
  RelatedItems,
  UnorderedList
} from 'govuk-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/questionnaire')
  }, [router])
  return (
    <Layout>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1 size={'L'}>Check if you might qualify for the Home Upgrade Grant </H1>
          <Paragraph>
            Find out whether you are eligible for the Home Upgrade Grant 2 scheme.
          </Paragraph>
          <Paragraph>
            Homeowners eligible for the Home Upgrade Grant 2 will receive a home
            assessment to determine what improvements will best help them save money on
            energy bills.
          </Paragraph>
          <Paragraph>
            Currently, this service only provides an indication of eligibility for the
            Home Upgrade Scheme. Further checks will be done by your local authority.
          </Paragraph>
          <Paragraph>
            For more information about other energy schemes and way to reduce your energy
            bills, see related content.
          </Paragraph>

          <H3>Use this service to:</H3>
          <UnorderedList>
            <ListItem>
              find out if you might be eligible for funding to improve your home
            </ListItem>
            <ListItem>find out your next steps </ListItem>
            <ListItem>receive guidance on other ways to get help</ListItem>
          </UnorderedList>
          <H3>Who can use this service</H3>
          <Paragraph>Homeowners whose property is:</Paragraph>
          <UnorderedList>
            <ListItem>located in England</ListItem>
            <ListItem>does not have a gas boiler</ListItem>
          </UnorderedList>
          <H3>Information to know before you start</H3>

          <UnorderedList>
            <ListItem>your household’s annual income, before tax</ListItem>
            <ListItem>whether your property has a gas boiler or not</ListItem>
          </UnorderedList>

          <Paragraph>
            Make sure you are able to provide accurate information about your household
            and property to receive an accurate result of whether you might be able to get
            the Home Upgrade Grant.
          </Paragraph>

          <Button
            start
            onClick={() => {
              router.push('/questionnaire?step=1')
            }}
          >
            Start now
          </Button>
        </GridCol>
        <GridCol setWidth="one-third">
          <RelatedItems>
            <H3>Related content</H3>
            <UnorderedList listStyleType="none">
              <ListItem>
                <Link href="#">Find energy grants for your home (Help to Heat)</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Boiler Upgrade Scheme (BUS)</Link>
              </ListItem>
              <ListItem>
                <Link href="#">
                  Sustainable warmth: protecting vulnerable households in England
                </Link>
              </ListItem>
              <ListItem>
                <Link href="#">Social Housing Decarbonisation Fund</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Energy Company Obligation (ECO)</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Household energy</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Find ways to save energy in your home</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Warm Home Discount Scheme</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Cold Weather Payment</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Winter Fuel Payment </Link>
              </ListItem>
            </UnorderedList>
          </RelatedItems>
        </GridCol>
      </GridRow>
    </Layout>
  )
}

export default NextPage
