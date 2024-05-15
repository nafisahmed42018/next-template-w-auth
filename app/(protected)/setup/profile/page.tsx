'use client'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { ErrorCard } from '@/components/auth/error-card'
import { useProfileSetup } from '@/hooks/use-profile-setup'

const ProfileSetup = () => {
  const isProfileCreated = useProfileSetup()
  if (isProfileCreated) {
    return (
      <CardWrapper
        headerLabel=""
        backButtonLabel="Back to Settings"
        backButtonHref="/settings"
      >
        <div className="flex flex-col items-center">
          Profile Already Created
        </div>
      </CardWrapper>
    )
  }
  return <ErrorCard />
}

export default ProfileSetup
