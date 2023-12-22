const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: [
      "business-card-templates4762.s3.ap-south-1.amazonaws.com",
      "appointment-files4762.s3.ap-south-1.amazonaws.com",
      "user-images4762.s3.ap-south-1.amazonaws.com",
      "picsum.photos",
      "user4762.s3.ap-south-1.amazonaws.com",
      "service4762.s3.ap-south-1.amazonaws.com",
    ],
  },
});
