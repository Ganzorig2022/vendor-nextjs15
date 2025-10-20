import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
			{children}
		</div>
	);
};

export default LoginLayout;
