describe('Get home energy improvements', () => {
  it('loads the homepage', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('contain', 'Get home energy improvements')
    cy.get('button').should('contain', 'Start now')
  })

  //Q. Which country is your property located in? Selects "England"
  it('checks the tool with valid input', () => {
    cy.visit('http://localhost:3000//questionnaire?step=1')
    cy.get('[type="radio"]').first().check()
    cy.get('span').should('contain', 'England')
    cy.get('span').should('contain', 'Scotland')
    cy.get('span').should('contain', 'Wales')
    cy.get('span').should('contain', 'Ireland')
    cy.get('button').should('contain', 'Continue')
  })
  //Q.Do you own your property? Selects "Yes, I own my property and live in it"
  it('checks the tool with valid input', () => {
    cy.visit('http://localhost:3000//questionnaire?step=2')
    cy.get('[type="radio"]').first().check()
    cy.get('legend').should('contain', 'Do you own your property?')
    cy.get('input')
    cy.get('span').should('contain', 'Yes, I own my property and live in it')
    cy.get('span').should('contain', 'No, I am a tenant')
    cy.get('span').should('contain', 'No, I am a social housing tenant')
    cy.get('span').should(
      'contain',
      'I am a property owner but lease my property to one or more tenants'
    )
    cy.get('button').should('contain', 'Continue')
  })

  //Q.What is the address of your property? Input- "123" and "AB12 3CD"
  it('checks the tool with valid property address input', () => {
    cy.visit('http://localhost:3000//questionnaire?step=3')
    cy.get('legend').should('contain', 'What is the address of your property?')
    cy.get('address.buildingNumberOrName').type('28')
    // Enter a valid postcode and click “Continue”
    cy.get('[type="text"]').should('be.visible')
    //Takes user to the address confirmation page and click “Continue”
    cy.visit('http://localhost:3000/questionnaire?step=31')
    cy.get('button').should('contain', 'Continue')
  })

  //Q. What is the council tax band of your property?Selects 'A'
  it('checks the tool with valid input', () => {
    cy.visit('http://localhost:3000//questionnaire?step=32')
    cy.get('legend').should('contain', 'What is the council tax band of your property?')
    cy.get('label').should('contain', 'Select your council tax band from the list below')
    cy.url('https://www.gov.uk/council-tax-bands')
    cy.get('A')
    cy.get('button').should('contain', 'Continue')
  })

  //Q.Is anyone in your household receiving any benefits? Selects 'Yes'
  it('checks the tool with valid input of household benefits', () => {
    cy.visit('http://localhost:3000//questionnaire?step=6')
    cy.get('legend').should(
      'contain',
      'Is anyone in your household receiving any benefits?'
    )
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q.What is your household income? Selects' Less than £31,000 a year'
  it('checks the tool with valid input of household income', () => {
    cy.visit('http://localhost:3000//questionnaire?step=8')
    cy.get('legend').should('contain', 'What is your household income?')
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q.What kind of property do you have? Selects 'House
  it('checks the tool with valid input of proprty type', () => {
    cy.visit('http://localhost:3000//questionnaire?step=9')
    cy.get('legend').should('contain', 'What kind of property do you have?')
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q.What kind of house do you have? Selects 'Detached'
  it('checks the tool with valid input of kind of house', () => {
    cy.visit('http://localhost:3000//questionnaire?step=91')
    cy.get('legend').should('contain', 'What kind of house do you have?')
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q.Number of bedrooms? Selects 'Three or more bedrooms'
  it('checks the tool with valid input of number of bedrooms', () => {
    cy.visit('http://localhost:3000//questionnaire?step=94')
    cy.get('legend').should('contain', 'Number of bedrooms')
    cy.get('[type="radio"]').last().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q. What kind of walls does your property have? Selects 'Solid Walls'
  it('checks the tool with valid input of wall type', () => {
    cy.visit('http://localhost:3000//questionnaire?step=10')
    cy.get('legend').should('contain', 'What kind of walls does your property have?')

    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })
  //Q.Are your walls insulated? Selects 'Yes they are all insulated'
  it('checks the tool with valid input of wall insultation', () => {
    cy.visit('http://localhost:3000//questionnaire?step=11')
    cy.get('legend').should('contain', 'Are your walls insulated?')

    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })
  //Q.Does this property have a loft? Selects 'Yes'
  it('checks the tool with valid input of if they have a loft', () => {
    cy.visit('http://localhost:3000//questionnaire?step=12')
    cy.get('legend').should('contain', 'Does this property have a loft?')
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q. Is there access to your loft? Selects 'Yes, there is access to my loft'
  it('checks the tool with valid input of loft access', () => {
    cy.visit('http://localhost:3000//questionnaire?step=13')
    cy.get('legend').should('contain', 'Is there access to your loft?')

    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })

  //Q.Is your loft fully insulated? Selects 'Yes, there is at least 200mm of insulation in my loft'
  it('checks the tool with valid input of loft insultation', () => {
    cy.visit('http://localhost:3000//questionnaire?step=14')
    cy.get('legend').should('contain', 'Is your loft fully insulated?')
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })
  //Displays check your answers
  it('checks the tool with valid output of answers', () => {
    cy.visit('http://localhost:3000//questionnaire?step=15')
    cy.get('legend').should('contain', 'Check your answers')
    cy.visit('http://localhost:3000//questionnaire?step=1')
    cy.visit('http://localhost:3000//questionnaire?step=2')
    cy.visit('http://localhost:3000//questionnaire?step=3')
    cy.visit('http://localhost:3000//questionnaire?step=6')
    cy.visit('http://localhost:3000//questionnaire?step=8')
    cy.visit('http://localhost:3000//questionnaire?step=15')
    cy.get('button').should('contain', 'Continue')
  })

  //Eligilblity message appears
  it('displays message to state eligiblity', () => {
    cy.visit('http://localhost:3000//questionnaire?step=151')
    cy.get('h1').should('contain', 'You may be eligible for the following')
    cy.get('button').should('contain', 'Continue')
  })
  // Q.Select your home energy supplier from the list below. Selects'British Gas'
  it('checks the tool with valid input for energy supplier', () => {
    cy.visit('http://localhost:3000//questionnaire?step=152')
    cy.get('legend').should(
      'contain',
      'Select your home energy supplier from the list below.'
    )
    cy.get('span').should(
      'contain',
      'If your home energy supplier is not listed, you can select any energy from the list.'
    )
    cy.get('select').select('British Gas')
    cy.get('button').should('contain', 'Continue')
  })

  //Q. Do you have your landlord’s permission to make changes to the property? Selects'Yes'
  it('checks the tool with valid input of landlord premission', () => {
    cy.visit('http://localhost:3000//questionnaire?step=16')
    cy.get('legend').should(
      'contain',
      'Do you have your landlord’s permission to make changes to the property?'
    )
    cy.get('[type="radio"]').first().check()
    cy.get('button').should('contain', 'Continue')
  })
  // Input form
  it('checks the tool with valid input for adding your details', () => {
    cy.visit('http://localhost:3000//questionnaire?step=18')
    cy.get('legend').should('contain', 'Add your personal and contact details')
    cy.get('span').should('contain', 'First name')
  })

  cy.get('input[name=firstName]').type('James')
  cy.get('input[name=lastName]').type('East')
  cy.get('input[name=phone]').type('07777 152 274')
  // Confirm and submit
  cy.get('input[type=submit]').click()
})
// Input form test 2
it('checks the tool with valid input for adding your name', () => {
  cy.visit('http://localhost:3000//questionnaire?step=18')
  cy.get('input[type="text"]').type('Test all the things').click()
  cy.get('span').should('contain', 'Last name')
  cy.get('input[type="text"]').type('Test all the things')
  cy.get('span').should('contain', 'Contact Number')
  cy.get('input[type="number"]').type('01234567890')
})

// Referral Successful
cy.visit('http://localhost:3000//success')

/*Unhappy user journey?*/

it('loads the homepage', () => {
  cy.visit('http://localhost:3000/')
  cy.get('h1').should('contain', 'Get home energy improvements')
  cy.get('button').should('contain', 'Start now')
})
// Ireland is selected
it('checks the tool with valid input', () => {
  cy.visit('http://localhost:3000//questionnaire?step=1')
  cy.get('[type="radio"]').last().check()
  cy.get('span').should('contain', 'England')
  cy.get('span').should('contain', 'Scotland')
  cy.get('span').should('contain', 'Wales')
  cy.get('span').should('contain', 'Ireland')
  cy.get('button').should('contain', 'Continue')
})
// Ineligible country page appears
it('loads ineligible county page', () => {
  cy.visit('http://localhost:3000/ineligible-country')
  cy.get('h1').should('contain', 'Sorry, this service isnt for you')
  cy.get('p').should(
    'contain',
    'This service is only for people who own their own home in England and Wales.You can find advice on home energy improvements on NIDirect'
  )
  cy.url(
    'https://www.nidirect.gov.uk/information-and-services/environment-and-outdoors/energy-advice'
  )
})
