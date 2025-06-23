import React from 'react'
import BoardingTemplate from '@/shared/components/onboarding/BoardingTemplate'
import ChooseRole from '../components/Role'
import MemberFrame from '../components/MemberFrame'

const OnboardingContainer = () => {
  return (
    <BoardingTemplate>
        {/* <ChooseRole /> */}
        <MemberFrame />
    </BoardingTemplate>
  )
}

export default OnboardingContainer
