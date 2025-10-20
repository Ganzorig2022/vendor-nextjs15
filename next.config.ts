import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		qualities: [75, 85, 100], // Explicitly allow qualities 75, 85, and 100
	},
};

export default nextConfig;
