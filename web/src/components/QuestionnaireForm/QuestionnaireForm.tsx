import { Steps } from '@/pages/questionnaire'
import { CountryOrProperty } from './CountryOrProperty'
import { OwningOfProperty } from './OwningOfProperty'
import { AddressOfProperty } from './AddressOfProperty'
import { AskAboutEPC } from './AskAboutEPC'
import { PropertyEPC } from './PropertyEPC'
import { Benefits } from './Benefits'
import { HouseholdIncome } from './HouseholdIncome'
import { CheckYourAnswers } from './CheckYourAnswers'
import { LandlordPermission } from './LandlordPermission'
import { SelectEnergySupplier } from './SelectEnergySupplier'
import { PersonalAndContactDetails } from './PersonalAndContactDetails'
import { ConfirmAndSubmit } from './ConfirmAndSubmit'
import { KindOfProperty } from './KindOfProperty'
import { KindOfPropertyHouse } from './KindOfPropertyHouse'
import { KindOfPropertyBungalow } from './KindOfPropertyBungalow'
import { KindOfPropertyFlat } from './KindOfPropertyFlat'
import { NumberOfBedrooms } from './NumberOfBedrooms'
import { PropertyWalls } from './PropertyWalls'
import { WallInsulation } from './WallInsulation'
import { Loft } from './Loft'
import { AccessToLoft } from './AccessToLoft'
import { LoftInsulation } from './LoftInsulation'
import { AdressOfPropertyList } from './AdressOfPropertyList'

const QuestionnaireForm = ({ steps }: { steps: Steps }) => {
  return (
    <div>
      {/* stage 1 */}
      {steps.currentStep === 1 && <CountryOrProperty nextStep={2} />}
      {steps.currentStep === 2 && <OwningOfProperty nextStep={3} />}
      {steps.currentStep === 3 && <AddressOfProperty nextStep={31} />}
      {steps.currentStep === 31 && <AdressOfPropertyList nextStep={4} />}

      {steps.currentStep === 4 && <AskAboutEPC nextStep={5} />}
      {steps.currentStep === 5 && <PropertyEPC nextStep={6} />}
      {/* stage 2 */}
      {steps.currentStep === 6 && <Benefits nextStep={8} />}
      {steps.currentStep === 8 && <HouseholdIncome nextStep={9} />}
      {steps.currentStep === 9 && <KindOfProperty nextStep={94} />}
      {steps.currentStep === 91 && <KindOfPropertyHouse nextStep={94} />}
      {steps.currentStep === 92 && <KindOfPropertyBungalow nextStep={94} />}
      {steps.currentStep === 93 && <KindOfPropertyFlat nextStep={94} />}
      {steps.currentStep === 94 && <NumberOfBedrooms nextStep={10} />}
      {/* stage 3 */}
      {steps.currentStep === 10 && <PropertyWalls nextStep={11} />}
      {steps.currentStep === 11 && <WallInsulation nextStep={12} />}
      {steps.currentStep === 12 && <Loft nextStep={13} />}
      {steps.currentStep === 13 && <AccessToLoft nextStep={14} />}
      {steps.currentStep === 14 && <LoftInsulation nextStep={15} />}
      {steps.currentStep === 15 && <CheckYourAnswers nextStep={16} />}
      {/* STAGE 4 */}
      {steps.currentStep === 16 && <LandlordPermission nextStep={17} />}
      {steps.currentStep === 17 && <SelectEnergySupplier nextStep={18} />}
      {steps.currentStep === 18 && <PersonalAndContactDetails nextStep={19} />}
      {steps.currentStep === 19 && <ConfirmAndSubmit nextStep={1} />}
    </div>
  )
}

export default QuestionnaireForm
