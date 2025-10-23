export interface INewDashboardData {
	merchant: IMerchantCount;
	p2p_transactions: P2pTransactionDashboard[];
}

export interface P2pTransactionDashboard {
	success: number;
	failed: number;
	total_transactions: number;
	year: number;
	month: number;
}

export interface IMerchantCount {
	totalCount: number;
	weekly: {
		last: number;
		prev: number;
		growthPercent: number;
	};
	monthly: {
		last: number;
		prev: number;
		growthPercent: number;
	};
}
export interface MerchantCount {
	count: string;
	weekly_count: string;
	monthly_count: string;
}

export interface TerminalProperty {
	draft: number[];
	registered: number[];
	terminated: number[];
}

export interface Terminal {
	monthly: TerminalProperty;
	weekly: TerminalProperty;
	today: TerminalProperty;
	total: number;
}

export interface QrAccount {
	total: number[];
	monthly: number[];
	weekly: number[];
}

export interface DashboardProperty {
	activated: number[];
}

export interface DashboardTransactions {
	name: "Амжилттай" | "Амжилтгүй";
	data: {
		x: number;
		y: number;
	}[];
}

export interface DashboardType {
	monthly: DashboardProperty;
	weekly: DashboardProperty;
	today: DashboardProperty;
}

export interface DashboardResponse {
	merchant: MerchantCount;
	terminal: Terminal;
	qraccount: QrAccount;
	dashboard: DashboardType;
	p2p_transactions: DashboardTransactions[];
	card_transactions: DashboardTransactions[];
}

export interface ToolTipPayload {
	name: string;
	draft: number;
	received: number;
	sent: number;
	returned: number;
	registered: number;
	canceled: number;
}

export interface ToolTipType {
	fill: string;
	name: string;
	dataKey: string;
	color: string;
	value: number;
	payload: ToolTipPayload;
}
