/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_AKVORADO_API_URL || 'http://localhost:8080'
    return [
      {
        source: '/api/v0/:path*',
        destination: `${apiUrl}/api/v0/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/v0/:path*',
        headers: [
          { key: 'Remote-User', value: process.env.AKVORADO_REMOTE_USER || 'admin' },
          { key: 'Remote-Name', value: process.env.AKVORADO_REMOTE_NAME || 'Administrator' },
          { key: 'Remote-Email', value: process.env.AKVORADO_REMOTE_EMAIL || 'admin@akvorado.local' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
