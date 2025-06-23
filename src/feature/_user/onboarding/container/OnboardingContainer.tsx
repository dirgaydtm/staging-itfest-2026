'use client'

import React, { useState } from 'react'
import BoardingTemplate from '@/shared/components/onboarding/BoardingTemplate'
import ChooseRole from '../components/Role'
import MemberFrame from '../components/MemberFrame'
import LoadingFrame from '../components/LoadingFrame'
import { useRouter } from 'next/navigation'

type ViewState = 'choose-role' | 'member' | 'loading'

const OnboardingContainer = () => {
  const [currentView, setCurrentView] = useState<ViewState>('choose-role')
  const router = useRouter()

  const handleRoleSelect = async (role: 'leader' | 'member') => {
    if (role === 'member') {
      setCurrentView('member')
    } else if (role === 'leader') {
      setCurrentView('loading')
      // Simulate loading for 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }

  const handleBackToChooseRole = () => {
    setCurrentView('choose-role')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'choose-role':
        return <ChooseRole onRoleSelect={handleRoleSelect} />
      case 'member':
        return <MemberFrame onBack={handleBackToChooseRole} />
      case 'loading':
        return <LoadingFrame />
      default:
        return <ChooseRole onRoleSelect={handleRoleSelect} />
    }
  }

  return (
    <BoardingTemplate>
      {renderCurrentView()}
    </BoardingTemplate>
  )
}

export default OnboardingContainer