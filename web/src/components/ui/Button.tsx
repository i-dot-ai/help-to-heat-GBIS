import { Button as GovUKButton } from 'govuk-react'
import styled, { StyledComponentProps } from 'styled-components'

import type { WithWhiteSpaceProps } from '@govuk-react/lib'
import * as React from 'react'
interface ButtonOwnProps extends WithWhiteSpaceProps {
  /**
   * Button text
   */
  children: React.ReactNode
  /**
   * Button icon
   */
  icon?: React.ReactNode
  /**
   * Renders a large button if set to true
   */
  start?: boolean
  /**
   * Override for default button colour
   */
  buttonColour?: string
  /**
   * Override for default button hover colour,
   * which defaults to `buttonColour` darkened by 5%
   */
  buttonHoverColour?: string
  /**
   * Override for default button shadow colour,
   * which defaults to `buttonColour` darkened by 15%
   */
  buttonShadowColour?: string
  /**
   * Override for default button text colour,
   * which defaults to govuk white
   */
  buttonTextColour?: string
}

type X = StyledComponentProps<'button', never, ButtonOwnProps, never> & {
  as?: never | undefined
  forwardedAs?: never | undefined
}

const StyledButton = styled(GovUKButton)`
  &:focus {
    border-color: #fd0;
    outline: 3px solid rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 0 1px #fd0;
  }

  &:focus:not(:active):not(:hover) {
    border-color: #fd0;
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 2px 0 #0b0c0c;
  }
`

export const Button = (props: X) => {
  return <StyledButton {...props} />
}
