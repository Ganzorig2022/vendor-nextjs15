export interface IMerchantListQuery {
  page: number
  limit: number
  search?: string | null
  start_date?: string | null
  end_date?: string | null
  mcc_code?: string | null
  mcc_code_mon?: string | null
  g_branch_id?: string | null
  allowed_transaction?: string | null
  transaction_type?: string | null
  transaction_status?: string | null
  start_year?: string | null
  type?: string | null
  reload?: boolean | null
}

export interface IMerchantItem {
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: boolean
  index: string
  merchant_status: string
  id: string
  is_active: boolean
  vendor_id?: string
  type?: string
  register_number?: string
  name?: string
  owner_register_no?: string
  owner_first_name?: string
  owner_last_name?: string
  owner_type?: string
  first_name?: string
  last_name?: string
  mcc_code?: string
  city?: string
  district?: string
  address?: string
  phone: string
  email: string
  location_lat: string
  location_lng: string
  enable_expiry: boolean
  expiry_minutes?: string
  has_ebarimt?: boolean
  has_vat?: boolean
  has_city_tax?: boolean
  ebarimt_by?: string
  ebarimt_customer_code?: string
  allow_partial: boolean
  allow_card_trx: boolean
  card_terminal_id?: string
  allow_p2p_trx: boolean
  p2p_terminal_id: string
  has_inform: boolean
  inform_id?: string
  has_check: boolean
  check_api?: string
  has_transaction: boolean
  wechat_registered: boolean
  company_name?: string
  customer_name?: string
  g_business_direction_id: string
  vendors?: any[]
}

export interface IMerchantList {
  rows: IMerchantItem[]
  count: number
}

interface MerchantCustomerBusinessDirection {
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

interface MerchantCustomer {
  id: string
  is_active: boolean
  parent_id: string | null
  fi_id: string
  user_id: string | null
  object_type: string | null
  object_id: string | null
  g_contract_id: string | null
  customer_no: string
  customer_code: string
  customer_status: string
  customer_status_date: string
  customer_tax_no: string | null
  customer_novasoft_no: string | null
  customer_name: string
  owner_type: string
  company_register_no: string
  company_name: string
  owner_register_no: string
  owner_first_name: string
  owner_last_name: string
  business_direction_id: string
  business_name_mon: string
  business_name_eng: string
  children_count: number
  phone: string
  email: string
  address: string
  web_site: string | null
  logo_url: string
  location_lat: number | null
  location_lng: number | null
  city: string
  district: string
  zipcode: string | null
  note: string
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: boolean
  business_direction: MerchantCustomerBusinessDirection
}

export interface IMerchantDetail {
  id: string
  is_active: boolean
  is_private: boolean
  fi_id: string
  xac_merchant_created: boolean
  has_wechat_merchant: boolean
  retailer_group: string | null
  g_branch_id: string
  code: string
  name: string
  theme: string
  g_business_direction_id: string
  mcc_code: string
  allow_card_trx: boolean
  allow_bank_trx: boolean
  city: string
  district: string
  address: string
  merchant_status: string
  merchant_status_date: string
  note: string | null
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: boolean
  customer: MerchantCustomer
  is_wechat: boolean
  merchantChangelogs: any[]
  customerChangelogs: any[]
  max_qr_account_count: number
}

interface MerchantPerson {
  register_number: string
  first_name: string
  last_name: string
  business_name: string
  business_name_eng?: string | null
  business_direction_id?: string | null
  mcc_code: string
  city: string
  district: string
  address: string
  phone: string
  email: string
}

interface MerchantCompany {
  owner_register_no?: string | null
  owner_first_name?: string | null
  owner_last_name?: string | null
  register_number: string
  name: string
  name_eng?: string | null
  business_direction_id?: string | null
  mcc_code: string
  city: string
  district: string
  address: string
  phone: string
  email: string
  company_name: string
  location_lat?: string | null
  location_lng?: string | null
}

export interface MerchantPersonCreate extends MerchantPerson {
  process_code?: string | null
}

export interface MerchantPersonUpdate extends MerchantPerson {
  merchant_id: string
}

export interface MerchantCompanyCreate extends MerchantCompany {
  process_code?: string | null
}
export interface MerchantCompanyUpdate extends MerchantCompany {
  merchant_id: string
}

enum SORT {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ProcessCodeBody {
  vendor_id?: string
  search?: string
  order_by?: {
    field: string
    sort: SORT
  }
  offset: {
    page: number
    limit: number
  }
}

export interface ProcesscodeItem {
  id: string
  name: string
  code: string
  acquirer: string
  mcc_code: string
  card_settlement: string
  transaction_type: string
  currency: string
  vendor_id: string
  is_default: boolean
  created_by: string
  created_date: string
  updated_by: string
  updated_date: string
  status: true
}

export interface ProcessCodeList {
  count: number
  rows: ProcesscodeItem[]
}

export interface ExcelExportResponse {
  url: string
}
