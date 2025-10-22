import { validation } from "@/lib/validations";
import { z } from "zod";

/* 🏢 Байгууллагын (Company Merchant) Schema */
export const companyMerchantSchema = z.object({
	owner_first_name: z
		.string()
		.describe("Захиралын нэр")
		.min(1, "Захиралын нэр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	owner_last_name: z
		.string()
		.describe("Захиралын овог")
		.min(1, "Захиралын овог оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	owner_register_no: z
		.string()
		.describe("Захиралын регистрийн дугаар")
		.min(1, "Регистрийн дугаар оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.register),

	register_number: z
		.string()
		.describe("Байгууллагын регистрийн дугаар")
		.min(1, "Байгууллагын регистр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.number),

	company_name: z
		.string()
		.describe("Байгууллагын нэр")
		.min(1, "Байгууллагын нэр оруулна уу")
		.max(100, "Хэт урт байна")
		.regex(validation.namePattern),

	name: z
		.string()
		.describe("Мерчантын нэр")
		.min(1, "Мерчантын нэр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),
	name_eng: z
		.string()
		.describe("Мерчантын нэр (Англи)")
		.min(1, "Англи нэр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	mcc_code: z
		.string()
		.describe("MCC код")
		.min(1, "MCC код оруулна уу")
		.max(255, "Хэт урт байна"),

	city: z
		.string()
		.describe("Хот")
		.min(1, "Хот оруулна уу")
		.max(255, "Хэт урт байна"),

	district: z
		.string()
		.describe("Дүүрэг")
		.min(1, "Дүүрэг оруулна уу")
		.max(255, "Хэт урт байна"),

	address: z
		.string()
		.describe("Хаяг")
		.min(1, "Хаяг оруулна уу")
		.max(255, "Хэт урт байна"),

	phone: z
		.string()
		.describe("Утасны дугаар")
		.min(1, "Утасны дугаар оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.number),

	email: z.email("Зөв имэйл оруулна уу").max(255, "Хэт урт байна"),

	// location_lat: z.string().describe("Өргөрөг").optional().nullable(),
	// location_lng: z.string().describe("Уртраг").optional().nullable(),

	max_qr_account_count: z
		.string()
		.describe("Дээд QR дансны тоо")
		.min(1, "QR дансны тоо оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.number),
});

/* 👤 Хувь хүн (Person Merchant) Schema */
export const personMerchantSchema = z.object({
	first_name: z
		.string()
		.describe("Нэр")
		.min(1, "Нэр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	last_name: z
		.string()
		.describe("Овог")
		.min(1, "Овог оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	register_number: z
		.string()
		.describe("Регистрийн дугаар")
		.min(1, "Регистрийн дугаар оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.register),
	business_name: z
		.string()
		.describe("Бизнесийн нэр")
		.min(1, "Бизнесийн нэр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	business_name_eng: z
		.string()
		.describe("Бизнесийн нэр (Англи)")
		.min(1, "Англи нэр оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.namePattern),

	mcc_code: z
		.string()
		.describe("MCC код")
		.min(1, "MCC код оруулна уу")
		.max(255, "Хэт урт байна"),

	city: z
		.string()
		.describe("Хот")
		.min(1, "Хот оруулна уу")
		.max(255, "Хэт урт байна"),

	district: z
		.string()
		.describe("Дүүрэг")
		.min(1, "Дүүрэг оруулна уу")
		.max(255, "Хэт урт байна"),

	address: z
		.string()
		.describe("Хаяг")
		.min(1, "Хаяг оруулна уу")
		.max(255, "Хэт урт байна"),

	phone: z
		.string()
		.describe("Утасны дугаар")
		.min(1, "Утасны дугаар оруулна уу")
		.max(255, "Хэт урт байна")
		.regex(validation.number),

	email: z.email("Зөв имэйл оруулна уу").max(255, "Хэт урт байна"),
});

export type PersonMerchantFormType = z.infer<typeof personMerchantSchema>;
export type CompanyMerchantFormType = z.infer<typeof companyMerchantSchema>;

export const merchantFormDefaults = {
	owner_first_name: "",
	owner_last_name: "",
	owner_register_no: "",
	register_number: "",
	company_name: "",
	name: "",
	name_eng: "",
	mcc_code: "",
	city: "",
	district: "",
	address: "",
	phone: "",
	email: "",
	location_lat: "",
	location_lng: "",
	max_qr_account_count: "",
};

export type MerchantType = "ORGANIZATION" | "PERSON";

export const PERSON_FIELD_LABELS: Record<string, string> = {
	first_name: "Нэр",
	last_name: "Овог",
	register_number: "Регистрийн дугаар",
	business_name: "Бизнесийн нэр",
	business_name_eng: "Бизнесийн нэр (Англи)",
	mcc_code: "MCC код",
	city: "Хот",
	district: "Дүүрэг",
	address: "Хаяг",
	phone: "Утасны дугаар",
	email: "Цахим шуудан",
};

export const ORGANIZATION_FIELD_LABELS: Record<string, string> = {
	owner_first_name: "Захиралын нэр",
	owner_last_name: "Захиралын овог",
	owner_register_no: "Захиралын регистрийн дугаар",
	register_number: "Байгууллагын регистрийн дугаар",
	company_name: "Компанийн нэр",
	name: "Бизнесийн нэр",
	name_eng: "Бизнесийн нэр (Англи)",
	mcc_code: "MCC код",
	city: "Хот",
	district: "Дүүрэг",
	address: "Хаяг",
	phone: "Утасны дугаар",
	email: "Цахим шуудан",
	location_lat: "Байршлын өргөрөг",
	location_lng: "Байршлын уртраг",
	max_qr_account_count: "QR дансны тоо",
};
