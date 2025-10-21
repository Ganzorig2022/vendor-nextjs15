"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBusinessDirection, getMCC } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import { IMerchantItem } from "../types/types";
import { DATE_FORMAT } from "@/core/constants/values";

export const columns: ColumnDef<IMerchantItem>[] = [
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
		accessorKey: "id",
		header: "Мерчант ID",
	},
	{
		accessorKey: "type",
		header: "Төрөл",
		cell: ({ row }) => {
			const type = row.original.type;
			return type === "PERSON" ? (
				<Badge variant="success">Иргэн</Badge>
			) : (
				<Badge variant="destructive">Байгууллага</Badge>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Нэр",
	},
	{
		accessorKey: "mcc_code",
		header: "MCC код",
		cell: ({ row }) => {
			const mcc = row.original.mcc_code;
			const mccName = getMCC(mcc ?? "");
			return <div>{mcc + " " + (mccName || "")}</div>;
		},
	},
	{
		accessorKey: "g_business_direction_id",
		header: "Бизнесийн чиглэл",
		cell: ({ row }) => {
			const bd = row.original.g_business_direction_id;
			const bDirectionName = getBusinessDirection(bd ?? "");
			return <div>{bDirectionName || "-"}</div>;
		},
	},
	{
		accessorKey: "city",
		header: "Байрших хот",
	},
	{
		accessorKey: "district",
		header: "Сум/Дүүрэг",
	},
	{
		accessorKey: "address",
		header: "Хаяг",
		cell: ({ row }) => {
			const address = row.original.address ?? "-";
			return (
				<div
					className="max-w-[240px] break-words whitespace-normal"
					title={address}>
					{address}
				</div>
			);
		},
	},
	{
		header: "Зөвшөөрөгдсөн гүйлгээ",
		cell: ({ row }) => {
			const { allow_card_trx, allow_p2p_trx, wechat_registered } =
				row.original;
			return (
				<div className="flex gap-2">
					<Badge variant={allow_card_trx ? "success" : "destructive"}>
						Карт
					</Badge>
					<Badge variant={allow_p2p_trx ? "success" : "destructive"}>
						Данс
					</Badge>
					<Badge
						variant={wechat_registered ? "success" : "destructive"}>
						WeChat
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "merchant_status",
		header: "Төлөв",
		cell: ({ row }) => {
			const status = row.original.merchant_status;
			return status === "REGISTERED" ? (
				<Badge variant="success">Бүртгэгдсэн</Badge>
			) : (
				<Badge variant="destructive">Бүртгэгдээгүй</Badge>
			);
		},
	},
	{
		header: "Огноо",
		accessorKey: "created_date",
		cell: ({ row }) => {
			const date = row.original.created_date;
			return (
				<div className="flex justify-center">
					{dayjs(date).format(DATE_FORMAT)}
				</div>
			);
		},
	},
	{
		header: "Үйлдэл",
		cell: ({ row }) => {
			const { id, type, name } = row.original;
			const searchParams = new URLSearchParams({
				type: type as "COMPANY" | "PERSON",
				name: name as string,
			});
			return (
				<Link
					href={`/merchant/${id}?${searchParams}`}
					className="flex justify-center">
					<Eye className="h-4 w-4" />
				</Link>
			);
		},
	},
];
