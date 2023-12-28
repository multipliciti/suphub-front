/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
		domains: ['suphub-dev.s3.amazonaws.com', 'multipliciti-app.s3.amazonaws.com', 'localhost'],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/marketplace',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
