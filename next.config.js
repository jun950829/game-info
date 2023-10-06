/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir : '.next',
  basePath: "",
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  trailingSlash: false,
  useFileSystemPublicRoutes: true,
  swcMinify: true,
  api: {
    bodyParser: false,
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions : ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
