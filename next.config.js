/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/ads.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
