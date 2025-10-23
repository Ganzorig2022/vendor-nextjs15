import { BarChart2, Calendar, Inbox } from "lucide-react";
import { ROUTES } from "./routes";

export type MiniChartType = {
	title: string;
	type: string;
	icon: string;
	subTitle: string;
};

export const miniChartData: MiniChartType[] = [
	{
		title: "Нийт мерчантын тоо",
		type: "totalCount",
		icon: "/book-check.png",
		subTitle: "",
	},
	{
		title: "Энэ сард бүртгэсэн мерчант",
		type: "monthly",
		icon: "/book-check.png",
		subTitle: "Өмнөх сартай харьцуулахад",
	},
	{
		title: "Сүүлийн 7 хоногт бүртгэсэн мерчант",
		type: "weekly",
		icon: "/book-check.png",
		subTitle: "Өмнөх 7 хоногтой харьцуулахад",
	},
];

export const initialPageValues = {
	page: 1,
	limit: 20,
	reload: false,
	search: undefined,
};

export const DATE_FORMAT = "YYYY-MM-DD HH:mm";

export const MENU_ITEMS = [
	{
		title: "Дашбоард",
		url: ROUTES.protected.home,
		icon: BarChart2,
	},
	{
		title: "Mерчант",
		url: ROUTES.protected.merchant,
		icon: Inbox,
	},
	{
		title: "Карт",
		url: "#",
		icon: Calendar,
		items: [
			{
				title: "Картын гүйлгээ",
				url: ROUTES.protected.cardTransactions,
				isActive: false,
			},
			{
				title: "Картын тайлан",
				url: ROUTES.protected.cardReport,
				isActive: false,
			},
		],
	},
	{
		title: "Данс",
		url: "#",
		icon: Calendar,
		items: [
			{
				title: "Дансны гүйлгээ",
				url: ROUTES.protected.p2pTransactions,
				isActive: false,
			},
			{
				title: "Дансны тайлан",
				url: ROUTES.protected.p2pReport,
				isActive: false,
			},
		],
	},
];
