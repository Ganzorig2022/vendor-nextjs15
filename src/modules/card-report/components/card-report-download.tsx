import { useDownloadExcelMutation } from "../api/card-report-mutation";

export function ReportDownloadButton({
	file,
}: {
	file: { path: string; name: string };
}) {
	const downloadMutation = useDownloadExcelMutation();

	return (
		<button
			onClick={() =>
				downloadMutation.mutate({
					filePath: file.path,
					fileName: file.name,
				})
			}
			disabled={downloadMutation.isPending}
			className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80 disabled:opacity-60">
			{downloadMutation.isPending ? "Татаж байна..." : "Файл татах"}
		</button>
	);
}
