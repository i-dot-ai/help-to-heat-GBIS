import fetchMock from 'jest-fetch-mock'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AccessToLoft } from '@/components/questions/AccessToLoft'

describe('Question: AccessToLoft', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })
  it('renders', async () => {
    render(
      <AccessToLoft
        onSubmit={jest.fn()}
        defaultValues={{
          loftAccess: 'yes'
        }}
      />
    )

    expect(screen.getByText('Is there access to your loft?')).toBeInTheDocument()
  })
})
