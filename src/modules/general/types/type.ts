export interface Branch {
  code: string
  created_by: string
  created_date: string
  customer_id: string
  id: string
  is_active: boolean
  name: string
  note: string
  status: boolean
  updated_by: string
  updated_date: string
}

interface Acquirer {
  bank_code: string
  acquirer: string
  issuer: string
  name_mon: string
  name_eng: string
  user_prefix: string
}

export interface MCC {
  mcc_code: string
  is_active: boolean
  g_business_direction_id: string
  name_mon: string
  name_eng: string | null
  note: string | null
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: boolean
  mcc_banks: MCCBank[]
}

interface MCCBank {
  id: string
  is_active: boolean
  mcc_code: string
  bank_code: string
  note: string | null
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: boolean
}

export interface BusinessDirection {
  id: string
  is_active: boolean
  name: string
  logo: string | null
  note: string | null
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: boolean
}

interface ApprovedAccountBank {
  code: string
  name_eng: string
  name_mon: string
  account_number_limit: {
    min: number
    max: number
  }
}

interface Bank {
  code: string
  name_eng: string
  name_mon: string
}

interface City {
  code: string
  name: string
  parent: string
  zone: string
}

interface District {
  code: string
  name: string
  parent: string
  zone: string
}

interface Currency {
  currency: string
  symbol: string
}

interface AttachmentType {
  type: string
  name: string
}

interface AttachmentLimits {
  CITIZEN_CARD: number
  AGREEMENT: number
  SURROUND_PICTURE: number
  REGISTRATION_DOCS: number
  ANKET: number
}

interface ContractStatus {
  status: string
  name: string
  color: string
}
interface PaymentStatus {
  status: string
  name: string
  color: string
}

export interface CardTransactionType {
  code: string
  name: string
  color: string
}

interface CardTerminalStatus {
  status: string
  name: string
  color: string
}

interface BankAccountStatus {
  status: string
  name: string
}

interface POSTerminalStatus {
  status: string
  color: string
  name: string
}

interface QRStatus {
  status: string
  color: string
  name: string
}

interface TransactionStatus {
  status: string
  name: string
  color: string
}

interface MerchantStatus {
  status: string
  name: string
  color: string
}

interface UserHistoryStatus {
  status: string
  name: string
  color: string
}

interface UserHistoryType {
  status: string
  color: string
  name: string
}

export interface GeneralData {
  acquirers: Acquirer[]
  s3host: string
  mccs: MCC[]
  business_directions: BusinessDirection[]
  approved_account_banks: ApprovedAccountBank[]
  banks: Bank[]
  fiBranches: Branch[]
  cities: City[]
  districts: District[]
  currencies: Currency[]
  attachment_types: AttachmentType[]
  attachment_limits: AttachmentLimits
  contract_status: ContractStatus[]
  CARD_TRANSACTION_TYPE: CardTransactionType[]
  card_terminal_status: CardTerminalStatus[]
  bank_account_status: BankAccountStatus[]
  pos_terminal_status: POSTerminalStatus[]
  qr_status: QRStatus[]
  transaction_status: TransactionStatus[]
  payment_status: PaymentStatus[]
  merchant_status: MerchantStatus[]
  user_history_status: UserHistoryStatus[]
  user_history_type: UserHistoryType[]
  fin_profiles: any[] // TODO
  permission_list: any[] // TODO
}
