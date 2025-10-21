import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		qualities: [75, 85, 100], // Explicitly allow qualities 75, 85, and 100
	},
	eslint: {
		// stop production builds if lint errors:
		ignoreDuringBuilds: false,
		// only lint specific dirs if you want speed:
		dirs: ["src", "pages", "components"],
	},
};

export default nextConfig;
