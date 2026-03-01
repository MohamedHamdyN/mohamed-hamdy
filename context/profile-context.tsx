"use client"

import React, { createContext, useContext } from "react"
import type { Profile } from "@/lib/db"

type ProfileContextValue = {
  profile: Profile | null
}

const ProfileContext = createContext<ProfileContextValue>({ profile: null })

export function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile | null
  children: React.ReactNode
}) {
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext).profile
}