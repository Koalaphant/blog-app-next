/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ncjhfrjcgmqhmcsrgmfh.supabase.co",
        port: "", // Leave this empty if you don't use a specific port
        pathname: "/storage/v1/object/public/featured_images/**", // Adjust as needed for your use case
      },
    ],
  },
};

export default nextConfig;
