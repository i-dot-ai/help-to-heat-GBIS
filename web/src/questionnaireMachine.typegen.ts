// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.createLead': {
      type: 'done.invoke.createLead'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.fetchAddressSuggestions': {
      type: 'done.invoke.fetchAddressSuggestions'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.form.property_suggested_epc_loading:invocation[0]': {
      type: 'done.invoke.form.property_suggested_epc_loading:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.createLead': { type: 'error.platform.createLead'; data: unknown }
    'error.platform.fetchAddressSuggestions': {
      type: 'error.platform.fetchAddressSuggestions'
      data: unknown
    }
    'error.platform.form.property_suggested_epc_loading:invocation[0]': {
      type: 'error.platform.form.property_suggested_epc_loading:invocation[0]'
      data: unknown
    }
    'xstate.init': { type: 'xstate.init' }
    'xstate.stop': { type: 'xstate.stop' }
  }
  invokeSrcNameMap: {
    getAddressSuggestions: 'done.invoke.fetchAddressSuggestions'
    getEPCForUPRN: 'done.invoke.form.property_suggested_epc_loading:invocation[0]'
    submitForm: 'done.invoke.createLead'
  }
  missingImplementations: {
    actions: never
    delays: never
    guards: never
    services: never
  }
  eventsCausingActions: {
    calculateCouncilTaxBandSize:
      | 'PREVIOUS'
      | 'done.invoke.form.property_suggested_epc_loading:invocation[0]'
      | 'error.platform.form.property_suggested_epc_loading:invocation[0]'
    clearAddressSuggestions: 'ANSWER' | 'PREVIOUS' | 'xstate.stop'
    clearAddressSuggestionsError: 'PREVIOUS' | 'xstate.stop'
  }
  eventsCausingDelays: {}
  eventsCausingGuards: {}
  eventsCausingServices: {
    getAddressSuggestions: 'ANSWER'
    getEPCForUPRN: 'ANSWER'
    submitForm: 'CREATE_LEAD'
  }
  matchesStates:
    | 'access_to_loft'
    | 'check_your_answers'
    | 'choose_supplier'
    | 'complete'
    | 'confirm_and_submit'
    | 'confirm_and_submit_error'
    | 'confirm_and_submit_loading'
    | 'epc_does_owner_have_details'
    | 'epc_found'
    | 'epc_not_eligible'
    | 'epc_request_details'
    | 'household_income'
    | 'ineligible_country'
    | 'kind_of_property'
    | 'kind_of_property_bungalow'
    | 'kind_of_property_flat'
    | 'kind_of_property_house'
    | 'landlord_permission'
    | 'list_of_elegible_schemes'
    | 'local_council_support'
    | 'loft'
    | 'loft_insulation'
    | 'number_of_bedrooms'
    | 'personal_and_contact_details'
    | 'property_address'
    | 'property_address_finder_error'
    | 'property_address_finder_loading'
    | 'property_address_select'
    | 'property_council_tax'
    | 'property_location'
    | 'property_ownership'
    | 'property_suggested_epc_loading'
    | 'property_walls'
    | 'receiving_benefits'
    | 'wall_insulation'
  tags: never
}
