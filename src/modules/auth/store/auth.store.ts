'use client'

import { IMerchantItem } from '@/modules/merchant/types/types'
import { create } from 'zustand'
import { IUser } from '../types/type'

type AuthState = {
  token: string | null
  clientName: string | null
  processCode: string | null
  user: IUser | null
  merchant: IMerchantItem | null
  isLoading: boolean
  error: string | null // optional for better UX

  setAuth: (data: {
    clientName: string
    processCode: string
    access_token: string
    user: IUser
    merchant: IMerchantItem
  }) => void

  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  clientName: null,
  processCode: null,
  user: null,
  merchant: null,
  isLoading: false,
  error: null,

  setAuth: (data) =>
    set({
      token: data.access_token,
      clientName: data.clientName,
      processCode: data.processCode,
      user: data.user,
      merchant: data.merchant,
    }),

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Logout failed')

      // ✅ clear client state
      set({
        token: null,
        user: null,
        merchant: null,
        isLoading: false,
      })
    } catch (error: any) {
      console.error('Logout failed:', error)
      set({
        isLoading: false,
        error: error.message ?? 'Logout failed',
      })
    }
  },
}))
