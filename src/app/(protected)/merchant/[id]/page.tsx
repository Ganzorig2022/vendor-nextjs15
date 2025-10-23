"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useMerchantMutations } from "@/modules/merchant/api/merchant.mutations";
import { useMerchantQuery } from "@/modules/merchant/api/merchant.query";
import MerchantForm from "@/modules/merchant/components/merchant-form";
import { MerchantType } from "@/modules/merchant/schema/merchant.schema";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function MerchantDetailPage() {
	const params = useParams();
	const merchant_id = params?.id as string;
	const searchParams = useSearchParams();
	const merchantType = searchParams.get("type") as MerchantType;

	const { data, isFetching } = useMerchantQuery({
		type: "detail",
		merchant_id: merchant_id,
	});

	const { merchantCompanyUpdateMutation, merchantPersonUpdateMutation } =
		useMerchantMutations({
			onSuccess: () => {
				toast.success("Амжилттай хадгалагдлаа.");
			},
			onError: () => {},
		});

	const isSaving =
		merchantCompanyUpdateMutation.isPending ||
		merchantPersonUpdateMutation.isPending;

	if (isFetching)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	if (!data) return <div>No merchant found</div>;

	const onSubmit = (values: any) => {
		const body = values;
		body["merchant_id"] = data?.id;
		console.log("✅ Submitted:", body);

		const service =
			merchantType === "PERSON"
				? merchantPersonUpdateMutation
				: merchantCompanyUpdateMutation;

		service.mutate(body);
	};

	return (
		<Card className="px-4">
			{data && (
				<>
					<MerchantForm
						merchantType={merchantType}
						onSubmit={onSubmit}
						className="grid grid-cols-4 items-center gap-6"
						data={data}
						disabled={isSaving}
					/>
					<div className="ml-auto">
						<Button
							size="sm"
							variant="info"
							type="submit"
							form="merchantForm"
							disabled={isSaving}>
							{isSaving && <Spinner className="mr-2" />}
							{!isSaving ? "Хадгалах" : "Хадгалж байна..."}
						</Button>
					</div>
				</>
			)}
		</Card>
	);
}
