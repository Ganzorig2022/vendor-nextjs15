import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATE_FORMAT } from "@/core/constants/values";
import {
  convertBankName,
  getBankName,
  getCardTransactionType,
  numberWithCommas
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { P2PTransactionRowItem } from "../types/type";

export const columns: ColumnDef<P2PTransactionRowItem>[] = [
	{
		accessorKey: "index",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}>
					№
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="text-center font-medium">{+row.id + 1}</div>;
		},
	},
	{
		accessorKey: "payment.payment_name",
		header: "Төлбөрийн нэр",
	},
	{
		accessorKey: "customer_code",
		header: "Харилцагчийн код",
		cell: ({ row }) => {
			const customer_code = row.original.payment.customer_code;

			return (
				<div className="text-center font-medium">{customer_code}</div>
			);
		},
	},
	{
		accessorKey: "payment_status",
		header: "Төлөв",
		cell: ({ row }) => {
			const payment_status = row.original.payment.payment_status;
			const isPaid = payment_status === "PAID";

			return (
				<Badge variant={isPaid ? "success" : "failed"}>
					{isPaid ? "Амжилттай" : "Амжилтгүй"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "transaction_bank_code",
		header: "Гүйлгээ хийсэн банк",
		cell: ({ row }) => {
			const transaction_bank_code =
				row.original.payment.transaction_bank_code;
			const name = getBankName(transaction_bank_code);
			const bankName = convertBankName(name);

			return (
				<div className="flex gap-1 items-center">
					{transaction_bank_code && (
						<Image
							src={`/bank_logo/${bankName}.png`}
							width={20}
							height={20}
							quality={100}
							alt="card logo"
							style={{ objectFit: "cover" }}
						/>
					)}
					<span>{name || "-"}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "payment_type",
		header: "Гүйлгээний төрөл",
		cell: ({ row }) => {
			const { payment_type } = row.original.payment;
			const card_type = getCardTransactionType(payment_type);
			return (
				<div className="flex gap-1 items-center">
					<Badge variant={card_type?.code.toLowerCase() ?? "default"}>
						{card_type.name}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "id",
		header: "Qpay гүйлгээний дугаар",
		cell: ({ row }) => {
			const { id } = row.original.payment_transactions[0];
			return <div className="flex gap-1 items-center">{id}</div>;
		},
	},
	{
		accessorKey: "payment_transactions_amount",
		header: "Энгийн гүйлгээний дүн",
		cell: ({ row }) => {
			const { amount } = row.original.payment_transactions[0];
			return (
				<div className="flex gap-1 items-center">
					{numberWithCommas((+amount).toFixed(2)) || "-"}
				</div>
			);
		},
	},
	{
		accessorKey: "charge_transactions_amount",
		header: "Шимтгэлтэй гүйлгээний дүн",
		cell: ({ row }) => {
			const amount = Number(
				row.original?.charge_transactions?.[0]?.amount ?? 0
			);
			return (
				<div className="flex gap-1 items-center">
					{numberWithCommas(amount.toFixed(2)) || "-"}
				</div>
			);
		},
	},
	{
		accessorKey: "payment_transactions",
		header: "Нийт дүн",
		cell: ({ row }) => {
			const { payment_amount } = row.original.payment;
			return (
				<div className="flex gap-1 items-center">
					{numberWithCommas((+payment_amount).toFixed(2)) || "-"}
				</div>
			);
		},
	},
	{
		accessorKey: "payment_currency",
		header: "Валют",
		cell: ({ row }) => {
			const { payment_currency } = row.original.payment;
			return (
				<div className="flex gap-1 items-center">
					{payment_currency || "-"}
				</div>
			);
		},
	},
	{
		accessorKey: "payment_transactions_received",
		header: "Хүлээн авсан	банк",
		cell: ({ row }) => {
			const account_bank_code =
				row.original.payment_transactions[0].account_bank_code;
			const name = getBankName(account_bank_code);
			const bankName = convertBankName(name);

			return (
				<div className="flex gap-1 items-center">
					{account_bank_code && (
						<Image
							src={`/bank_logo/${bankName}.png`}
							width={20}
							height={20}
							quality={100}
							alt="card logo"
							style={{ objectFit: "cover" }}
						/>
					)}
					<span>{name || "-"}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "payment_account_name",
		header: "Дансны нэр",
		cell: ({ row }) => {
			const account_name =
				row.original.payment_transactions[0].account_name;
			return (
				<div className="flex gap-1 items-center">
					{account_name || "-"}
				</div>
			);
		},
	},
	{
		header: "Үүсгэсэн oгноо",
		accessorKey: "created_date",
		cell: ({ row }) => {
			const date = row.original.payment.payment_status_date;
			return (
				<div className="flex justify-center">
					{dayjs(date).format(DATE_FORMAT)}
				</div>
			);
		},
	},
];
