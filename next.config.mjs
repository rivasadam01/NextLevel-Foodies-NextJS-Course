/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextlevel-foodies-course.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
