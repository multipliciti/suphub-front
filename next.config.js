/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
		domains: [
			'suphub-prod.s3.amazonaws.com',
			'suphub-dev.s3.amazonaws.com',
			'multipliciti-app.s3.amazonaws.com',
			'localhost',
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.resolve.alias.canvas = false;

		return config;
	},
};

module.exports = nextConfig;
