import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-screen items-center justify-center flex flex-col gap-6">
			<Image
				src={"/main-background.svg"}
				alt="Main background image"
				quality="100"
				fill
				sizes="100vw"
				style={{
					objectFit: "cover",
					zIndex: -1,
				}}
			/>
			{children}
		</div>
	);
};

export default AuthLayout;
