/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath : "",
  distDir : '.next',
  trailingSlash : true,
  useFileSystemPublicRoutes: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions : ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
