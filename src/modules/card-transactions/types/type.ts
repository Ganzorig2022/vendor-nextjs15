interface ICardTransactionRowItemPayment {
  created_date: string
  created_by: string
  updated_date: string
  updated_by: string
  status: boolean
  is_active: boolean
  id: string
  g_merchant_id: string
  g_payment_id: string | null
  wallet_id: string
  customer_id: string
  customer_code: string
  card_id: string
  callback_url: string
  object_type: string
  object_id: string
  qr_code: string | null
  has_surcharge: boolean
  surcharge_amount: string
  payment_amount: string
  payment_currency: string
  payment_name: string
  payment_description: string
  receiver_defined: boolean
  receiver_name: string
  receiver_logo: string
  has_ebarimt: boolean
  payment_status: string
  payment_status_date: string
  transaction_type: string
  note: string
  g_business_direction_id: string
  mcc_code: string
  theme: string | null
  ebarimt_registered: boolean
  ebarimt_receiver_type: string | null
  ebarimt_receiver: string | null
}

interface ICardTransactionRowItemTransaction {
  mcc_code: string
  created_date: string
  created_by: string
  updated_date: string
  updated_by: string
  status: boolean
  id: string
  g_vendor_id: string
  vendor_name: string
  terminal_id: string
  g_payment_id: string
  payment_object_type: string
  payment_object_id: string
  payment_name: string
  payment_description: string
  g_wallet_id: string
  wallet_name: string
  wallet_customer_id: string
  wallet_customer_name: string
  wallet_customer_email: string
  wallet_customer_phone: string
  card_settlement: string
  card_processor: string
  acquirer: string
  acquirer_name: string
  acquirer_transaction_code: string
  acquirer_merchant_code: string
  acquirer_branch_code: string
  acquirer_terminal_code: string
  g_card_id: string
  card_type: string
  card_issuer: string
  card_issuer_name: string
  card_pan: string
  is_offsite: boolean
  transaction_id: string
  transaction_date: string
  transaction_description: string
  transaction_amount: string
  transaction_currency: string
  transaction_status: string
  transaction_status_date: string
  transaction_bank_info: string
  transaction_type: string
  settlement_date: string
  settlement_status: string
  settlement_status_date: string
  note: string
  merchant_fee: string
  wallet_fee: string
  trace_id: string | null
  transaction_status_info: string | null
}
export interface CardTransactionRowItem {
  _id: string
  merchant_id: string
  vendor_id: string
  payment: ICardTransactionRowItemPayment
  transaction: ICardTransactionRowItemTransaction
  payment_transactions: ICardTransactionRowItemTransaction[]
  charge_transactions: ICardTransactionRowItemTransaction[]
}

export interface CardTransactionResponse {
  rows: CardTransactionRowItem[]
  count: number
  totalAmountPerPage: number
}

export interface CardTransactionQuery {
  page: number
  limit: number
  search?: string | null
  card_issuer?: string | null
  transaction_status?: string | null
  mcc_code?: string | null
  mcc_code_mon?: string | null
  transaction_type?: string | null
  card_type?: string | null
  start_date?: string | null
  end_date?: string | null
  merchant_id?: string
}

export interface CardTransactionExcelListQuery {
  page: number
  limit: number
  start_year?: string | null
  merchant_id?: string | null
}

export interface CardTransactionExportResponse {
  url: string
}

export interface CardTransactionExportResponse {
  url: string
}
