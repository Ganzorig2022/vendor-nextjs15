import { IMerchantItem } from "@/modules/merchant/types/types";

export interface IAuthLogin {
  username: string;
  password: string;
  access_token: string;
  expires_in: number;
  "not-before-policy": string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  success: boolean;
  token_type: string;
  user: IUser;
  merchant: IMerchantItem;
  clientName: string; 
  processCode: string; 
}

export interface DefaultFields {
  status: boolean;
  updated_date: string;
  updated_by: string;
  created_date: string;
  created_by: string;
}

export interface DefaultTrxFields {
  enable_expiry: boolean;
  expiry_date: string | null;
  has_ebarimt: boolean;
  has_vat: boolean;
  has_city_tax: boolean;
  ebarimt_by: string | null;
  ebarimt_customer_code: string | null;
  allow_partial: boolean;
  allow_card_trx: boolean;
  card_terminal_id: string | null;
  allow_p2p_trx: boolean;
  p2p_terminal_id: string | null;
  has_inform: boolean;
  inform_id: string | null;
  has_check: boolean;
  check_api: string | null;
  has_transaction: boolean;
}

export interface IUser extends DefaultFields {
  id: string;
  username: string;
  is_active: boolean;
  note: string;
  role: string;
  g_staff_id: string;
  g_branch_id: string;
  merhcant_id: string;
  session_id: string;
  ip: string;
  os: string;
  user_agent: string;
  is_blocked: boolean;
  max_attempt: string;
  attempt_count: string;
  password_expired: boolean;
  vendor_id: string;
  vendor_merchant_id: string;
  first_name: string;
  last_name: string;
  position: string;
  register: string;
  email: string;
  phone: string;
}
