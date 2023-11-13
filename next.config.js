/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['suphub-dev.s3.amazonaws.com', 'multipliciti-app.s3.amazonaws.com'],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
