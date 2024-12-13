/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[{
      protocol:'https',
      hostname:'etmdqovfrhlykebdyell.supabase.co'
    },
    {
      protocol:'https',
      hostname:'lh3.googleusercontent.com'
    }]
  },
  reactStrictMode: false
};

export default nextConfig;
