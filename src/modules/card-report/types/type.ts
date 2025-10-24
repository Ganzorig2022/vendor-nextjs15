interface IFile {
	path: string;
	name: string;
	size: number;
	created_date: string;
	created_by: string;
}

export interface IDate {
	year: number;
	month: number;
	day?: number;
}

interface IStats {
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

export interface IDailyExcels {
	_id: string;
	date: IDate;
	vendor_id: string;
	file: IFile;
	stats: IStats;
}

export interface IReportMonthlyExcels {
	_id: string;
	date: IDate;
	vendor_id: string;
	file: IFile;
	stats: IStats;
	daily_excels?: IDailyExcels[];
}