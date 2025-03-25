const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   "business-card-templates4762.s3.ap-south-1.amazonaws.com",
    //   "appointment-files4762.s3.ap-south-1.amazonaws.com",
    //   "user-images4762.s3.ap-south-1.amazonaws.com",
    //   "picsum.photos",
    //   "images.unsplash.com",
    //   "user4762.s3.ap-south-1.amazonaws.com",
    //   "service4762.s3.ap-south-1.amazonaws.com",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
