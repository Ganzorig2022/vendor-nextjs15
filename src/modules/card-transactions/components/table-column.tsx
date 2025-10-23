"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATE_FORMAT } from "@/core/constants/values";
import { convertBankName, getCardTransactionType, getMCC } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { CardTransactionRowItem } from "../types/type";

export const columns = (page: number, limit: number): ColumnDef<CardTransactionRowItem>[] => [
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
    const globalIndex = (page - 1) * limit + (row.index + 1);
    return <div className="text-center font-medium">{globalIndex}</div>;
  },
	},
	{
		accessorKey: "merchant_id",
		header: "Мерчант ID",
	},
	{
		accessorKey: "payment_status",
		header: "Төрөл",
		cell: ({ row }) => {
			const payment_status = row.original.payment.payment_status;
			return (
				<Badge variant={payment_status.toLowerCase() as any}>
					{payment_status === "SUCCESS" ? "Амжилттай" : "Амжилтгүй"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "mcc_code",
		header: "MCC код",
		cell: ({ row }) => {
			const mcc = row.original.transaction.mcc_code;
			const mccName = getMCC(mcc ?? "");
			return <div>{mcc + " " + (mccName || "")}</div>;
		},
	},
	{
		accessorKey: "transaction.card_pan",
		header: "Картын дугаар",
	},
	{
		accessorKey: "card_issuer_name",
		header: "Карт гаргагч",
		cell: ({ row }) => {
			const { card_issuer_name } = row.original.transaction;
			const bankName = convertBankName(card_issuer_name);
			return (
				<div className="flex gap-1 items-center">
					{card_issuer_name && (
						<Image
							src={`/bank_logo/${bankName}.png`}
							width={20}
							height={20}
							quality={100}
							alt="card logo"
							style={{ objectFit: "cover" }}
						/>
					)}
					<span>{card_issuer_name || "-"}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "acquirer_name",
		header: "Карт хүлээн авагч",
		cell: ({ row }) => {
			const { acquirer_name } = row.original.transaction;
			const bankName = convertBankName(acquirer_name);
			return (
				<div className="flex gap-1 items-center">
					{acquirer_name && (
						<Image
							src={`/bank_logo/${bankName}.png`}
							width={20}
							height={20}
							quality={100}
							alt="card logo"
							style={{ objectFit: "cover" }}
						/>
					)}
					<span>{acquirer_name || "-"}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "card_type",
		header: "Карт хүлээн авагч",
		cell: ({ row }) => {
			const { card_type } = row.original.transaction;
			return (
				<div className="flex gap-1 items-center">
					{card_type && (
						<Image
							src={`/bank_card/${card_type.toLowerCase()}.svg`}
							width={50}
							height={50}
							quality={100}
							alt="card logo"
							style={{ objectFit: "cover" }}
						/>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "transaction_type",
		header: "Төрөл",
		cell: ({ row }) => {
			const { transaction_type } = row.original.transaction;
			const card_type = getCardTransactionType(transaction_type);
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
		accessorKey: "transaction.payment_description",
		header: "Гүйлгээний утга",
	},
	{
		accessorKey: "transaction.transaction_amount",
		header: "Дүн",
	},
	{
		accessorKey: "transaction.transaction_currency",
		header: "Валют",
	},
	{
		accessorKey: "transaction.merchant_fee",
		header: "Мерчант шимтгэл",
	},
	{
		accessorKey: "payment.payment_name",
		header: "Төлбөрийн нэр",
	},
	{
		accessorKey: "transaction.terminal_id",
		header: "Терминал код",
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
