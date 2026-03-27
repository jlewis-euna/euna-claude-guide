/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // If deploying to https://<username>.github.io/<repo-name>/
  // set basePath to '/<repo-name>' — e.g. '/euna-claude-guide'
  // Leave empty if deploying to a custom domain or root Pages site
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
}
module.exports = nextConfig
