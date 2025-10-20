export interface MerchantCount {
  count: string
  weekly_count: string
  monthly_count: string
}

export interface TerminalProperty {
  draft: number[]
  registered: number[]
  terminated: number[]
}

export interface Terminal {
  monthly: TerminalProperty
  weekly: TerminalProperty
  today: TerminalProperty
  total: number
}

export interface QrAccount {
  total: number[]
  monthly: number[]
  weekly: number[]
}

export interface DashboardProperty {
  activated: number[]
}

export interface DashboardTransactions {
  name: 'Амжилттай' | 'Амжилтгүй'
  data: {
    x: number
    y: number
  }[]
}

export interface DashboardType {
  monthly: DashboardProperty
  weekly: DashboardProperty
  today: DashboardProperty
}

export interface DashboardResponse {
  merchant: MerchantCount
  terminal: Terminal
  qraccount: QrAccount
  dashboard: DashboardType
  p2p_transactions: DashboardTransactions[]
  card_transactions: DashboardTransactions[]
}

export interface ToolTipPayload {
  name: string
  draft: number
  received: number
  sent: number
  returned: number
  registered: number
  canceled: number
}

export interface ToolTipType {
  fill: string
  name: string
  dataKey: string
  color: string
  value: number
  payload: ToolTipPayload
}
