interface PaymentTransaction {
	created_by: string;
	created_date: string;
	updated_by: string;
	updated_date: string;
	status: boolean;
	id: string;
	payment_id: string;
	wallet_id: string;
	customer_id: string;
	customer_code: string;
	g_merchant_id: string;
	g_payment_id: string;
	g_p2p_terminal_id: string;
	bank_code: string;
	description: string;
	has_customer_fee: string;
	customer_fee: string;
	amount: string;
	amount_mnt: string;
	currency: string;
	is_charge: boolean;
	is_interbank: boolean;
	account_bank_code: string;
	account_bank_branch_code: string | null;
	account_number: string;
	account_name: string;
	account_currency: string;
	bank_trans_status: string;
	bank_trans_date: string;
	bank_trans_note: string;
	bank_trans_exchange_rate: string;
	bank_trans_amount: string;
	bank_trans_currency: string;
	with_settlement: string;
	p2p_settlement: string | null;
	settlement_batched_id: string | null;
	settlement_date: string | null;
	settlement_status: string;
	settlement_status_date: string | null;
	transaction_status: string;
	transaction_status_date: string;
	note: string;
	bank_trans_no: string;
	trx_fee: null;
	has_confirmed_push: boolean;
	confirmed_push_date: string | null;
	has_confirmed_statement: boolean;
	confirmed_statement_date: string | null;
}

interface Payment {
	created_by: string;
	created_date: string;
	updated_by: string;
	updated_date: string;
	status: boolean;
	id: string;
	wallet_id: string;
	g_merchant_id: string;
	g_payment_id: string;
	g_p2p_terminal_id: string;
	customer_id: string;
	customer_code: string;
	transaction_bank_code: string;
	customer_account_number: null;
	callback_url: null;
	object_type: string;
	object_id: string;
	g_business_direction_id: string;
	mcc_code: string;
	qr_code: string;
	wallet_fee: string;
	qpay_fee: string;
	surcharge_amount: string;
	payment_amount: string;
	payment_currency: string;
	payment_name: string;
	payment_description: string;
	receiver_defined: string;
	receiver_name: string;
	receiver_logo: null;
	has_ebarimt: boolean;
	payment_type: string;
	payment_status: string;
	payment_status_date: string;
	payment_status_msg: string;
	note: string;
	ebarimt_registered: boolean;
	merchant_branch_code: string;
	merchant_staff_code: null;
	merchant_terminal_code: null;
	invoice_object_type: null;
	invoice_object_id: null;
	quick_qr_vendor_id: null;
	pos_terminal_no: null;
	has_confirm_trx_push: boolean;
	has_confirm_trx_statement: boolean;
}

// interface Invoice {
//   created_by: string;
//   created_date: string;
//   updated_by: string;
//   updated_date: string;
//   status: boolean;
//   id: string;
//   g_merchant_id: string;
//   object_type: string;
//   object_id: string;
//   qr_linked: boolean;
//   qr_code: string;
//   sender_invoice_no: string;
//   sender_name: string;
//   sender_logo: string;
//   sender_branch_code: string;
//   sender_branch_data: null;
//   sender_staff_code: null;
//   sender_staff_data: null;
//   sender_terminal_code: null;
//   sender_terminal_data: null;
//   receiver_code: string;
//   receiver_data: string;
//   invoice_no: string;
//   invoice_date: string;
//   invoice_due_date: string | null;
//   invoice_name: string;
//   invoice_description: string;
//   invoice_amount: null;
//   invoice_currency: string;
//   invoice_status: string;
//   invoice_status_date: string;
//   enable_expiry: boolean;
//   expiry_date: string;
//   has_ebarimt: boolean;
//   has_vat: boolean;
//   is_debt: boolean;
//   ebarimt_by: null;
//   ebarimt_customer_code: null;
//   allow_partial: boolean;
//   minimum_amount: null;
//   allow_exceed: boolean;
//   maximum_amount: null;
//   allow_card_trx: boolean;
//   g_card_terminal_id: string;
//   allow_p2p_trx: boolean;
//   g_p2p_terminal_id: string;
//   has_inform: boolean;
//   inform_id: null;
//   callback_url: string;
//   has_check: boolean;
//   check_api: null;
//   has_transaction: boolean;
//   with_tag: boolean;
//   tag: null;
//   note: null;
//   legacy_id: string;
//   has_service_fee: boolean;
//   service_fee_method: null;
//   service_fee_calc_type: null;
//   service_fee_onus: null;
//   service_fee_offus: null;
//   short_url: null;
//   package_id: null;
//   sub_package_id: null;
//   invoice_total_discount: null;
//   invoice_total_surcharge: null;
//   invoice_gross_amount: null;
//   invoice_total_tax: null;
// }

export interface P2PTransactionRowItem {
	_id: string;
	vendor_id: string;
	merchant_id: string;
	payment: Payment;
	payment_transactions: PaymentTransaction[];
	charge_transactions?: PaymentTransaction[];
}

export interface P2PTransactionResponse {
	rows: P2PTransactionRowItem[];
	count: number;
	totalAmountPerPage: number;
}

export interface P2PTransactionListQuery {
	page: number;
	limit: number;
	start_date?: string | undefined;
	end_date?: string | undefined;
	search?: string | undefined;
	// transaction_status?: string | undefined;
	payment_status?: string | undefined;
	mcc_code?: string | undefined;
	mcc_code_mon?: string | undefined;
	payment_type?: string | undefined;
	g_business_direction_id?: string | undefined;
}

export interface P2PTransactionExcel {
	page: number;
	limit: number;
	start_year?: string | null;
	merchant_id?: string;
}

interface File {
	path: string;
	name: string;
	size: number;
	created_date: string;
	created_by: string;
}

interface Date {
	year: number;
	month: number;
	day?: number;
}

interface Stats {
	payment_count: number;
	sum_payment_amount: number;
	payment_count_paid: number;
	sum_payment_amount_paid: number;
	charge_transaction_count: number;
	sum_charge_transaction_amount: number;
	charge_transaction_count_success: number;
	sum_charge_transaction_amount_success: number;
	payment_transaction_count: number;
	sum_payment_transaction_amount: number;
	payment_transaction_count_success: number;
	sum_payment_transaction_amount_success: number;
}

export interface DailyExcels {
	_id: string;
	bank_code: string;
	date: Date;
	fi_id: string;
	file: File;
	stats: Stats;
}

export interface MonthlyExcels {
	_id: string;
	bank_code: string;
	date: Date;
	fi_id: string;
	file: File;
	stats: Stats;
	daily_excels: DailyExcels[];
}

export interface P2pExcelListQuery {
	page: number;
	limit: number;
	start_year: string;
}

export interface P2pTransactionExportResponse {
	url: string;
}

export interface ITransactionReportWithDaily extends ITransactionReport {
	daily_excels: ITransactionReport[];
}

export interface ITransactionReport {
	_id: string;
	fi_id: string;
	vendor_id: string;
	date: {
		year: number;
		month: number;
		day: number;
	};
	file: {
		path: string;
		name: string;
		size: number;
		created_date: Date;
		created_by: string;
	};
	stats: {
		payment_count: number;
		sum_payment_amount: number;
		payment_count_paid: number;
		sum_payment_amount_paid: number;
		charge_transaction_count: number;
		sum_charge_transaction_amount: number;
		charge_transaction_count_success: number;
		sum_charge_transaction_amount_success: number;
		payment_transaction_count: number;
		sum_payment_transaction_amount: number;
		payment_transaction_count_success: number;
		sum_payment_transaction_amount_success: number;
	};
}
