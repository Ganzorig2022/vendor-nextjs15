'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IGeneralData } from '../types/type'

interface IMainStore {
  generalData: IGeneralData
  updateGeneralData: (newData: IGeneralData) => void
}

const useMainStore = create(
  persist<IMainStore>(
    (set) => ({
      generalData: {
        mccs: [],
        acquirers: [],
        s3host: '',
        business_directions: [],
        approved_account_banks: [],
        banks: [],
        fiBranches: [],
        cities: [],
        districts: [],
        currencies: [],
        attachment_types: [],
        attachment_limits: {
          CITIZEN_CARD: 0,
          AGREEMENT: 0,
          SURROUND_PICTURE: 0,
          REGISTRATION_DOCS: 0,
          ANKET: 0,
        },
        contract_status: [],
        CARD_TRANSACTION_TYPE: [],
        card_terminal_status: [],
        bank_account_status: [],
        pos_terminal_status: [],
        qr_status: [],
        transaction_status: [],
        payment_status: [],
        merchant_status: [],
        user_history_status: [],
        user_history_type: [],
        fin_profiles: [],
        permission_list: [],
      },
      updateGeneralData: (generalData: IGeneralData) => set({ generalData }),
    }),
    {
      name: 'vendor-store', // unique name for this store
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useMainStore
