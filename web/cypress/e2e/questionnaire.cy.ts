describe('Get home energy improvements- Check initial eligibility- Northern Ireland', () => {
  it('loads the homepage', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('contain', 'Get home energy improvements')
    cy.get('button').should('contain', 'Start now')
    cy.contains('Start now').click()

    cy.get('[type="radio"]').check('Northern Ireland')
    cy.contains('Continue').click()

    cy.get('h1').should('contain', "Sorry, this service isn't for you")
  })
})

describe('Get home energy improvements- Check initial eligibility- Scotland', () => {
  it('loads the homepage', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('contain', 'Get home energy improvements')
    cy.get('button').should('contain', 'Start now')
    cy.contains('Start now').click()

    cy.get('[type="radio"]').check('Scotland')
    cy.contains('Continue').click()

    cy.get('h1').should('contain', "Sorry, this service isn't for you")
  })

  describe('Get home energy improvements- Check initial eligibility- Wales', () => {
    it('loads the homepage', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').should('contain', 'Get home energy improvements')
      cy.get('button').should('contain', 'Start now')
      cy.contains('Start now').click()

      cy.get('[type="radio"]').check('Wales')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Do you own your property?')
    })
  })

  describe('Get home energy improvements-  Check initial eligibility-England', () => {
    it('loads the homepage', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').should('contain', 'Get home energy improvements')
      cy.get('button').should('contain', 'Start now')
      cy.contains('Start now').click()

      cy.get('[type="radio"]').check('England')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Do you own your property?')
    })
  })
  describe('Get home energy improvements', () => {
    it('Shows the happy path for user in England with a detached property in band H-refers to suppilers', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').should('contain', 'Get home energy improvements')
      cy.get('button').should('contain', 'Start now')
      cy.contains('Start now').click()

      cy.get('[type="radio"]').check('England')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Do you own your property?')
      cy.get('[type="radio"]').check('owner')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the address of your property?')
      cy.get('input[name="address.buildingNumberOrName"]').type('16')
      cy.get('input[name="address.postcode"]').type('NW1 4AE')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Select your address')
      cy.get('[type="radio"]').first().check()
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the council tax band of your property?')
      cy.get('select').select('H')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Does the property have an energy performance certificate (EPC)?'
      )
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'About your energy performance certificate (EPC)'
      )
      cy.get('select').select('D')
      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(0)
        .find('input')
        .type('15')

      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(1)
        .find('input')
        .type('12')

      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(2)
        .find('input')
        .type('2015')

      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Is anyone in your household receiving any benefits?'
      )
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is your household income?')
      cy.get('[type="radio"]').check('>£31k')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of property do you have?')
      cy.get('[type="radio"]').check('house')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of house do you have?')
      cy.get('[type="radio"]').check('detached')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Number of bedrooms')
      cy.get('[type="radio"]').check('3+')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of walls does your property have?')
      cy.get('[type="radio"]').check('solid')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Are your walls insulated?')
      cy.get('[type="radio"]').check('all')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Does this property have a loft?')
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Is there access to your loft?')
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Is your loft fully insulated?')
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Check your answers')
      cy.get('td').should('contain', 'Which country is your property located in?')
      cy.get('td').should('contain', 'England')

      cy.contains('Continue').click()

      cy.get('h1').should('contain', 'You may be eligible for the following')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Select your home energy supplier from the list below.'
      )
      cy.get('select').select('british-gas')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Add your personal and contact details')
      cy.get('input[name="personalDetails.firstName"]').type('Barry')
      cy.get('input[name="personalDetails.lastName"]').type('Allen')
      cy.get('input[name="personalDetails.phoneNumber"]').type('07514852468')
      cy.get('input[name="personalDetails.email"]').type('barry.allen@starlabs.com')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Confirm and submit')
      cy.contains('Continue').click()

      cy.get('div').should('contain', 'confirm_and_submit_error')
    })
  })
  describe('Get home energy improvements', () => {
    it('Shows the happy path for user in Wales with a detached property in band H-refers to suppilers', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').should('contain', 'Get home energy improvements')
      cy.get('button').should('contain', 'Start now')
      cy.contains('Start now').click()
      cy.get('[type="radio"]').check('Wales')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Do you own your property?')
      cy.get('[type="radio"]').check('owner')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the address of your property?')
      cy.get('input[name="address.buildingNumberOrName"]').type('16')
      cy.get('input[name="address.postcode"]').type('CF24 4TE')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Select your address')
      cy.get('[type="radio"]').first().check()
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the council tax band of your property?')
      cy.get('select').select('E')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Does the property have an energy performance certificate (EPC)?'
      )
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'About your energy performance certificate (EPC)'
      )
      cy.get('select').select('D')
      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(0)
        .find('input')
        .type('15')

      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(1)
        .find('input')
        .type('12')

      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(2)
        .find('input')
        .type('2020')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Is anyone in your household receiving any benefits?'
      )
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is your household income?')
      cy.get('[type="radio"]').check('>£31k')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of property do you have?')
      cy.get('[type="radio"]').check('bungalow')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of bungalow do you have?')
      cy.get('[type="radio"]').check('semi-detached')
      cy.contains('Continue').click()
      cy.get('legend').should('contain', 'Number of bedrooms')
      cy.get('[type="radio"]').check('2')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of walls does your property have?')
      cy.get('[type="radio"]').check('cavity')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Are your walls insulated?')
      cy.get('[type="radio"]').check('all')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Does this property have a loft?')
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Check your answers')
      cy.get('td').should('contain', 'Which country is your property located in?')
      cy.get('td').should('contain', 'Wales')

      cy.contains('Continue').click()

      cy.get('h1').should('contain', 'You may be eligible for the following')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Select your home energy supplier from the list below.'
      )
      cy.get('select').select('edf')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Add your personal and contact details')
      cy.get('input[name="personalDetails.firstName"]').type('Barry')
      cy.get('input[name="personalDetails.lastName"]').type('Allen')
      cy.get('input[name="personalDetails.phoneNumber"]').type('07514852468')
      cy.get('input[name="personalDetails.email"]').type('barry.allen@starlabs.com')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Confirm and submit')
      cy.contains('Continue').click()

      cy.get('div').should('contain', 'confirm_and_submit_error')
    })
  })

  describe('Get home energy improvements', () => {
    it('Shows the happy path for middle-floor flat tenant in England in band E-refers to suppilers', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').should('contain', 'Get home energy improvements')
      cy.get('button').should('contain', 'Start now')
      cy.contains('Start now').click()
      cy.get('[type="radio"]').check('England')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Do you own your property?')
      cy.get('[type="radio"]').check('tenant')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the address of your property?')
      cy.get('input[name="address.buildingNumberOrName"]').type('16')
      cy.get('input[name="address.postcode"]').type('EN3 4TE')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Select your address')
      cy.get('[type="radio"]').first().check()
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the council tax band of your property?')
      cy.get('select').select('E')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Does the property have an energy performance certificate (EPC)?'
      )
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'About your energy performance certificate (EPC)'
      )
      cy.get('select').select('D')
      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(0)
        .find('input')
        .type('15')

      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(1)
        .find('input')
        .type('12')

      cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
        .eq(2)
        .find('input')
        .type('2020')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Is anyone in your household receiving any benefits?'
      )
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is your household income?')
      cy.get('[type="radio"]').check('<£31k')
      cy.contains('Continue').click()

      cy.get('h1').should(
        'contain',
        'You may be eligible for additional household support from your local council'
      )
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of property do you have?')
      cy.get('[type="radio"]').check('apartment')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of flat do you have?')
      cy.get('[type="radio"]').check('middle-floor')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Number of bedrooms')
      cy.get('[type="radio"]').check('2')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of walls does your property have?')
      cy.get('[type="radio"]').check('mix')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Are your walls insulated?')
      cy.get('[type="radio"]').check('none')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Does this property have a loft?')
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Check your answers')
      cy.get('td').should('contain', 'Which country is your property located in?')
      cy.get('td').should('contain', 'England')
      cy.contains('Continue').click()

      cy.get('h1').should('contain', 'You may be eligible for the following')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Select your home energy supplier from the list below.'
      )
      cy.get('select').select('ovo')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Add your personal and contact details')
      cy.get('input[name="personalDetails.firstName"]').type('Barry')
      cy.get('input[name="personalDetails.lastName"]').type('Allen')
      cy.get('input[name="personalDetails.phoneNumber"]').type('07514852468')
      cy.get('input[name="personalDetails.email"]').type('barry.allen@starlabs.com')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Confirm and submit')
      cy.contains('Continue').click()

      cy.get('div').should('contain', 'confirm_and_submit_error')
    })
  })

  describe('Get home energy improvements', () => {
    it('Shows the happy path for terraced house tenant no EPC in England in band C-refers to suppilers', () => {
      cy.visit('http://localhost:3000/')
      cy.get('h1').should('contain', 'Get home energy improvements')
      cy.get('button').should('contain', 'Start now')
      cy.contains('Start now').click()
      cy.get('[type="radio"]').check('England')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Do you own your property?')
      cy.get('[type="radio"]').check('tenant')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the address of your property?')
      cy.get('input[name="address.buildingNumberOrName"]').type('16')
      cy.get('input[name="address.postcode"]').type('EN3 4TE')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Select your address')
      cy.get('[type="radio"]').first().check()
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is the council tax band of your property?')
      cy.get('select').select('C')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Does the property have an energy performance certificate (EPC)?'
      )
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Is anyone in your household receiving any benefits?'
      )
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What is your household income?')
      cy.get('[type="radio"]').check('<£31k')
      cy.contains('Continue').click()

      cy.get('h1').should(
        'contain',
        'You may be eligible for additional household support from your local council'
      )
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of property do you have?')
      cy.get('[type="radio"]').check('house')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of house do you have?')
      cy.get('[type="radio"]').check('terraced')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Number of bedrooms')
      cy.get('[type="radio"]').check('3+')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'What kind of walls does your property have?')
      cy.get('[type="radio"]').check('cavity')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Are your walls insulated?')
      cy.get('[type="radio"]').check('some')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Does this property have a loft?')
      cy.get('[type="radio"]').check('yes')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Is there access to your loft?')
      cy.get('[type="radio"]').check('no')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Is your loft fully insulated?')
      cy.get('[type="radio"]').check('unknown')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Check your answers')
      cy.get('td').should('contain', 'Which country is your property located in?')
      cy.get('td').should('contain', 'England')
      cy.contains('Continue').click()

      cy.get('h1').should('contain', 'You may be eligible for the following')
      cy.contains('Continue').click()

      cy.get('legend').should(
        'contain',
        'Select your home energy supplier from the list below.'
      )
      cy.get('select').select('shell')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Add your personal and contact details')
      cy.get('input[name="personalDetails.firstName"]').type('Barry')
      cy.get('input[name="personalDetails.lastName"]').type('Allen')
      cy.get('input[name="personalDetails.phoneNumber"]').type('07514852468')
      cy.get('input[name="personalDetails.email"]').type('barry.allen@starlabs.com')
      cy.contains('Continue').click()

      cy.get('legend').should('contain', 'Confirm and submit')
      cy.contains('Continue').click()

      cy.get('div').should('contain', 'confirm_and_submit_error')
    })
    describe('Get home energy improvements', () => {
      it('Shows the happy path for social flat tenant in Wales in band C-refers to suppilers', () => {
        cy.visit('http://localhost:3000/')
        cy.get('h1').should('contain', 'Get home energy improvements')
        cy.get('button').should('contain', 'Start now')
        cy.contains('Start now').click()
        cy.get('[type="radio"]').check('Wales')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Do you own your property?')
        cy.get('[type="radio"]').check('social-tenant')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'What is the address of your property?')
        cy.get('input[name="address.buildingNumberOrName"]').type('16')
        cy.get('input[name="address.postcode"]').type('CF24 4TE')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Select your address')
        cy.get('[type="radio"]').first().check()
        cy.contains('Continue').click()

        cy.get('legend').should(
          'contain',
          'What is the council tax band of your property?'
        )
        cy.get('select').select('C')
        cy.contains('Continue').click()

        cy.get('legend').should(
          'contain',
          'Does the property have an energy performance certificate (EPC)?'
        )
        cy.get('[type="radio"]').check('no')
        cy.contains('Continue').click()
        cy.get('legend').should(
          'contain',
          'Is anyone in your household receiving any benefits?'
        )
        cy.get('[type="radio"]').check('yes')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'What is your household income?')
        cy.get('[type="radio"]').check('<£31k')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'What kind of property do you have?')
        cy.get('[type="radio"]').check('house')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'What kind of house do you have?')
        cy.get('[type="radio"]').check('end-terrace')
        cy.contains('Continue').click()
        cy.get('legend').should('contain', 'Number of bedrooms')
        cy.get('[type="radio"]').check('1')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'What kind of walls does your property have?')
        cy.get('[type="radio"]').check('not-listed')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Are your walls insulated?')
        cy.get('[type="radio"]').check('unknown')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Does this property have a loft?')
        cy.get('[type="radio"]').check('no')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Check your answers')
        cy.get('td').should('contain', 'Which country is your property located in?')
        cy.get('td').should('contain', 'Wales')

        cy.contains('Continue').click()

        cy.get('h1').should('contain', 'You may be eligible for the following')
        cy.contains('Continue').click()

        cy.get('legend').should(
          'contain',
          'Select your home energy supplier from the list below.'
        )
        cy.get('select').select('bulb')
        cy.contains('Continue').click()

        cy.get('legend').should(
          'contain',
          'Do you have your landlord’s permission to make changes to the property?'
        )
        cy.get('[type="radio"]').check('no')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Add your personal and contact details')
        cy.get('input[name="personalDetails.firstName"]').type('Barry')
        cy.get('input[name="personalDetails.lastName"]').type('Allen')
        cy.get('input[name="personalDetails.phoneNumber"]').type('07514852468')
        cy.get('input[name="personalDetails.email"]').type('barry.allen@starlabs.com')
        cy.contains('Continue').click()

        cy.get('legend').should('contain', 'Confirm and submit')
        cy.contains('Continue').click()

        cy.get('div').should('contain', 'confirm_and_submit_error')
      })

      describe('Get home energy improvements', () => {
        it('Shows the unhappy path expired EPC in England', () => {
          cy.visit('http://localhost:3000/')
          cy.get('h1').should('contain', 'Get home energy improvements')
          cy.get('button').should('contain', 'Start now')
          cy.contains('Start now').click()
          cy.get('[type="radio"]').check('England')
          cy.contains('Continue').click()

          cy.get('legend').should('contain', 'Do you own your property?')
          cy.get('[type="radio"]').check('owner')
          cy.contains('Continue').click()

          cy.get('legend').should('contain', 'What is the address of your property?')
          cy.get('input[name="address.buildingNumberOrName"]').type('16')
          cy.get('input[name="address.postcode"]').type('EN3 4TE')
          cy.contains('Continue').click()

          cy.get('legend').should('contain', 'Select your address')
          cy.get('[type="radio"]').first().check()
          cy.contains('Continue').click()

          cy.get('legend').should(
            'contain',
            'What is the council tax band of your property?'
          )
          cy.get('select').select('F')
          cy.contains('Continue').click()

          cy.get('legend').should(
            'contain',
            'Does the property have an energy performance certificate (EPC)?'
          )
          cy.get('[type="radio"]').check('yes')
          cy.contains('Continue').click()

          cy.get('legend').should(
            'contain',
            'About your energy performance certificate (EPC)'
          )
          cy.get('select').select('B')
          cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
            .eq(0)
            .find('input')
            .type('15')

          cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
            .eq(1)
            .find('input')
            .type('12')

          cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
            .eq(2)
            .find('input')
            .type('2001')
          cy.contains('Continue').click()

          cy.get('h1').should(
            'contain',
            'Your property does not meet the minimum EPC eligibility requirements.'
          )
        })
      })
      describe('Get home energy improvements', () => {
        it('Shows the unhappy path for a landlord with an expired EPC in Wales', () => {
          cy.visit('http://localhost:3000/')
          cy.get('h1').should('contain', 'Get home energy improvements')
          cy.get('button').should('contain', 'Start now')
          cy.contains('Start now').click()
          cy.get('[type="radio"]').check('England')
          cy.contains('Continue').click()

          cy.get('legend').should('contain', 'Do you own your property?')
          cy.get('[type="radio"]').check('landlord')
          cy.contains('Continue').click()

          cy.get('legend').should('contain', 'What is the address of your property?')
          cy.get('input[name="address.buildingNumberOrName"]').type('16')
          cy.get('input[name="address.postcode"]').type('EN3 4TE')
          cy.contains('Continue').click()

          cy.get('legend').should('contain', 'Select your address')
          cy.get('[type="radio"]').first().check()
          cy.contains('Continue').click()

          cy.get('legend').should(
            'contain',
            'What is the council tax band of your property?'
          )
          cy.get('select').select('B')
          cy.contains('Continue').click()

          cy.get('legend').should(
            'contain',
            'Does the property have an energy performance certificate (EPC)?'
          )
          cy.get('[type="radio"]').check('yes')
          cy.contains('Continue').click()

          cy.get('legend').should(
            'contain',
            'About your energy performance certificate (EPC)'
          )
          cy.get('select').select('C')
          cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
            .eq(0)
            .find('input')
            .type('15')

          cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
            .eq(1)
            .find('input')
            .type('12')

          cy.get('[data-cy="propertyEpcDetails.propertyEpcDate"] label')
            .eq(2)
            .find('input')
            .type('2010')
          cy.contains('Continue').click()

          cy.get('h1').should(
            'contain',
            'Your property does not meet the minimum EPC eligibility requirements.'
          )
        })
      })
    })
  })
})
