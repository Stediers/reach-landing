if (!self.define) {
  let e,
    s = {};
  const i = (i, c) => (
    (i = new URL(i + ".js", c).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, a) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => i(e, n),
      o = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (a(...e), t));
  };
}
define(["./workbox-7c2a5a06"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/192.png", revision: "539eb515ba2d9a40a4a712667cb402c4" },
        { url: "/256.png", revision: "8778921caba1ceef60e91d99444b1a04" },
        { url: "/512.png", revision: "609823604f26017d28ab2ee7d57acaa8" },
        {
          url: "/_next/static/chunks/0c428ae2-ee383aae74b9b6ac.js",
          revision: "ee383aae74b9b6ac",
        },
        {
          url: "/_next/static/chunks/1080-f0c51ada0361b475.js",
          revision: "f0c51ada0361b475",
        },
        {
          url: "/_next/static/chunks/1721-08fd397e008372a7.js",
          revision: "08fd397e008372a7",
        },
        {
          url: "/_next/static/chunks/1890.96c61c75385d9153.js",
          revision: "96c61c75385d9153",
        },
        {
          url: "/_next/static/chunks/1a48c3c1-4d4908f6f4e2673f.js",
          revision: "4d4908f6f4e2673f",
        },
        {
          url: "/_next/static/chunks/1bfc9850-05d9495a17f7e23d.js",
          revision: "05d9495a17f7e23d",
        },
        {
          url: "/_next/static/chunks/2172-5c3948deb44ac370.js",
          revision: "5c3948deb44ac370",
        },
        {
          url: "/_next/static/chunks/2176.a4e2f98d1ca82669.js",
          revision: "a4e2f98d1ca82669",
        },
        {
          url: "/_next/static/chunks/2372.64c096550eab937c.js",
          revision: "64c096550eab937c",
        },
        {
          url: "/_next/static/chunks/2518.50dedc7689f7c478.js",
          revision: "50dedc7689f7c478",
        },
        {
          url: "/_next/static/chunks/252f366e-66461d2eccf90956.js",
          revision: "66461d2eccf90956",
        },
        {
          url: "/_next/static/chunks/2769-17563800a0fc74d2.js",
          revision: "17563800a0fc74d2",
        },
        {
          url: "/_next/static/chunks/31664189.df86b3d87fb62a0e.js",
          revision: "df86b3d87fb62a0e",
        },
        {
          url: "/_next/static/chunks/3261-96f950cb61d6d907.js",
          revision: "96f950cb61d6d907",
        },
        {
          url: "/_next/static/chunks/33d91445.7f05b4bd9921034b.js",
          revision: "7f05b4bd9921034b",
        },
        {
          url: "/_next/static/chunks/4072747d-33e68decb875b338.js",
          revision: "33e68decb875b338",
        },
        {
          url: "/_next/static/chunks/4206-b41c08d8850dee7d.js",
          revision: "b41c08d8850dee7d",
        },
        {
          url: "/_next/static/chunks/4803.18e15bbf1ea195c1.js",
          revision: "18e15bbf1ea195c1",
        },
        {
          url: "/_next/static/chunks/545f34e4-f5eea6b6fc733c79.js",
          revision: "f5eea6b6fc733c79",
        },
        {
          url: "/_next/static/chunks/5675-8c5aff836b085abc.js",
          revision: "8c5aff836b085abc",
        },
        {
          url: "/_next/static/chunks/6577-443180c68f52c9be.js",
          revision: "443180c68f52c9be",
        },
        {
          url: "/_next/static/chunks/6760-6ce527cf7f507272.js",
          revision: "6ce527cf7f507272",
        },
        {
          url: "/_next/static/chunks/6893.70279016a91ad0f2.js",
          revision: "70279016a91ad0f2",
        },
        {
          url: "/_next/static/chunks/7175-e52fa38508474d13.js",
          revision: "e52fa38508474d13",
        },
        {
          url: "/_next/static/chunks/7314-133ee856fe7adb2f.js",
          revision: "133ee856fe7adb2f",
        },
        {
          url: "/_next/static/chunks/7727-7e1b93908b943f80.js",
          revision: "7e1b93908b943f80",
        },
        {
          url: "/_next/static/chunks/7779ef99-e542ebc4872fb780.js",
          revision: "e542ebc4872fb780",
        },
        {
          url: "/_next/static/chunks/78e521c3-112c27202f8d9547.js",
          revision: "112c27202f8d9547",
        },
        {
          url: "/_next/static/chunks/9030.f08356443490a590.js",
          revision: "f08356443490a590",
        },
        {
          url: "/_next/static/chunks/9144-e25ecc85c62157dd.js",
          revision: "e25ecc85c62157dd",
        },
        {
          url: "/_next/static/chunks/9226-accfaa325fd78460.js",
          revision: "accfaa325fd78460",
        },
        {
          url: "/_next/static/chunks/95b64a6e-0fb381c9f2de3bbe.js",
          revision: "0fb381c9f2de3bbe",
        },
        {
          url: "/_next/static/chunks/9705.6dd56965f6d34f15.js",
          revision: "6dd56965f6d34f15",
        },
        {
          url: "/_next/static/chunks/9821-c29bb58549c2809b.js",
          revision: "c29bb58549c2809b",
        },
        {
          url: "/_next/static/chunks/98ea7ec2-534afa5771eb1f1f.js",
          revision: "534afa5771eb1f1f",
        },
        {
          url: "/_next/static/chunks/9979-bc1ef05e80b8653c.js",
          revision: "bc1ef05e80b8653c",
        },
        {
          url: "/_next/static/chunks/a0e03aaa.bf8e7b314522b3b4.js",
          revision: "bf8e7b314522b3b4",
        },
        {
          url: "/_next/static/chunks/ae51ba48-6c4963b01b3f01ed.js",
          revision: "6c4963b01b3f01ed",
        },
        {
          url: "/_next/static/chunks/b98bc7c3-0c1217de4d97e7d7.js",
          revision: "0c1217de4d97e7d7",
        },
        {
          url: "/_next/static/chunks/c7773329-cffa00e6c06b18a2.js",
          revision: "cffa00e6c06b18a2",
        },
        {
          url: "/_next/static/chunks/d0447323-e63fbd244f92a4ce.js",
          revision: "e63fbd244f92a4ce",
        },
        {
          url: "/_next/static/chunks/d0c16330.e3e8f71bc1b721f0.js",
          revision: "e3e8f71bc1b721f0",
        },
        {
          url: "/_next/static/chunks/d64684d8-0070352869ac7291.js",
          revision: "0070352869ac7291",
        },
        {
          url: "/_next/static/chunks/d6840153-b332a41395058d05.js",
          revision: "b332a41395058d05",
        },
        {
          url: "/_next/static/chunks/ea88be26-8999e83897a47117.js",
          revision: "8999e83897a47117",
        },
        {
          url: "/_next/static/chunks/framework-314c182fa7e2bf37.js",
          revision: "314c182fa7e2bf37",
        },
        {
          url: "/_next/static/chunks/main-1d5e27e204acd31d.js",
          revision: "1d5e27e204acd31d",
        },
        {
          url: "/_next/static/chunks/pages/404-e447b51ce2ebd5d8.js",
          revision: "e447b51ce2ebd5d8",
        },
        {
          url: "/_next/static/chunks/pages/_app-0fb378bd27051e08.js",
          revision: "0fb378bd27051e08",
        },
        {
          url: "/_next/static/chunks/pages/_error-83f70c7be3775587.js",
          revision: "83f70c7be3775587",
        },
        {
          url: "/_next/static/chunks/pages/console-159f805a9d6f70ed.js",
          revision: "159f805a9d6f70ed",
        },
        {
          url: "/_next/static/chunks/pages/console/analytics-4cf9112458c68b63.js",
          revision: "4cf9112458c68b63",
        },
        {
          url: "/_next/static/chunks/pages/console/analytics/profile-efa12d3d8233bbae.js",
          revision: "efa12d3d8233bbae",
        },
        {
          url: "/_next/static/chunks/pages/console/analytics/service-d9dab8bf9fd78f2f.js",
          revision: "d9dab8bf9fd78f2f",
        },
        {
          url: "/_next/static/chunks/pages/console/analytics/service/%5BserviceId%5D-756f5327c9343bae.js",
          revision: "756f5327c9343bae",
        },
        {
          url: "/_next/static/chunks/pages/console/appointments-2906786d09224908.js",
          revision: "2906786d09224908",
        },
        {
          url: "/_next/static/chunks/pages/console/appointments/request-feedback-bd41410c7c25f9ed.js",
          revision: "bd41410c7c25f9ed",
        },
        {
          url: "/_next/static/chunks/pages/console/appointments/view-appointment/%5BappointmentId%5D-e908181241ddc561.js",
          revision: "e908181241ddc561",
        },
        {
          url: "/_next/static/chunks/pages/console/feedbacks-0973e7bc0ad7e1a4.js",
          revision: "0973e7bc0ad7e1a4",
        },
        {
          url: "/_next/static/chunks/pages/console/profile-c1bd2927a7922209.js",
          revision: "c1bd2927a7922209",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/(socials)/instagram-d67e7088d2ec8d2a.js",
          revision: "d67e7088d2ec8d2a",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/edit-7a8cfa6aa25371e1.js",
          revision: "7a8cfa6aa25371e1",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/manage-addresses-98ab91f9b3a8b5fc.js",
          revision: "98ab91f9b3a8b5fc",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/manage-addresses/add-address-488a303214b41ecd.js",
          revision: "488a303214b41ecd",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/manage-addresses/edit/%5BaddressId%5D-78719f112fc5c50c.js",
          revision: "78719f112fc5c50c",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/update-location-0fe6ed16df297e67.js",
          revision: "0fe6ed16df297e67",
        },
        {
          url: "/_next/static/chunks/pages/console/profile/update-mobile-number-a1349c0f8f35d5e9.js",
          revision: "a1349c0f8f35d5e9",
        },
        {
          url: "/_next/static/chunks/pages/console/services-266581662a044d5d.js",
          revision: "266581662a044d5d",
        },
        {
          url: "/_next/static/chunks/pages/console/services/add-service-d0301f07dc52bd19.js",
          revision: "d0301f07dc52bd19",
        },
        {
          url: "/_next/static/chunks/pages/console/services/manage-870abe1bd9c09b2e.js",
          revision: "870abe1bd9c09b2e",
        },
        {
          url: "/_next/static/chunks/pages/console/services/offers-a24b35d56b1ac5e4.js",
          revision: "a24b35d56b1ac5e4",
        },
        {
          url: "/_next/static/chunks/pages/console/services/offers/add-offer-383c15af77f5b5e9.js",
          revision: "383c15af77f5b5e9",
        },
        {
          url: "/_next/static/chunks/pages/console/services/offers/manage/%5BdiscountId%5D-19ad07a5763d0766.js",
          revision: "19ad07a5763d0766",
        },
        {
          url: "/_next/static/chunks/pages/index-49ab156690fdc1ee.js",
          revision: "49ab156690fdc1ee",
        },
        {
          url: "/_next/static/chunks/pages/privacy-policy-3136ae817827152a.js",
          revision: "3136ae817827152a",
        },
        {
          url: "/_next/static/chunks/pages/terms-and-conditions-65745cfb57347fca.js",
          revision: "65745cfb57347fca",
        },
        {
          url: "/_next/static/chunks/pages/user/%5BuserId%5D-921d6e331fe61698.js",
          revision: "921d6e331fe61698",
        },
        {
          url: "/_next/static/chunks/pages/user/onboarding-7c47eb76c95fb6f7.js",
          revision: "7c47eb76c95fb6f7",
        },
        {
          url: "/_next/static/chunks/pages/user/sign-in-5e9ffceee40a9790.js",
          revision: "5e9ffceee40a9790",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-cac63cb435e70232.js",
          revision: "cac63cb435e70232",
        },
        {
          url: "/_next/static/css/2aa199ae6265e4c0.css",
          revision: "2aa199ae6265e4c0",
        },
        {
          url: "/_next/static/css/b25b50eb18d74183.css",
          revision: "b25b50eb18d74183",
        },
        {
          url: "/_next/static/css/e73d6710cb576ca8.css",
          revision: "e73d6710cb576ca8",
        },
        {
          url: "/_next/static/media/404-image.024e97d1.webp",
          revision: "8663c189320bfdb13bfdf35126353439",
        },
        {
          url: "/_next/static/media/car_wash_service.63811591.svg",
          revision: "4f594fbeb70865de334a8dc9de680097",
        },
        {
          url: "/_next/static/media/catering_service.6268c99d.svg",
          revision: "8863593b79ace29cacdd7788a566d596",
        },
        {
          url: "/_next/static/media/default-profile-image.6a938710.jpeg",
          revision: "2e955bc02acc4d65df26b9d372ad0c4b",
        },
        {
          url: "/_next/static/media/driver_service.8bd0a5c7.svg",
          revision: "514b4b1de962811eb239a527878aa64c",
        },
        {
          url: "/_next/static/media/firefox-install.5bcc0e86.png",
          revision: "362a73c273c83c2fb591c765e43fb624",
        },
        {
          url: "/_next/static/zP4ShJpoBDcoVKF9Y9h_E/_buildManifest.js",
          revision: "daf1d1b69978c468438dc390e0097c39",
        },
        {
          url: "/_next/static/zP4ShJpoBDcoVKF9Y9h_E/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/firefox-install.png",
          revision: "362a73c273c83c2fb591c765e43fb624",
        },
        {
          url: "/icon-192x192.png",
          revision: "2623898454133a2155e69abca5e618b8",
        },
        {
          url: "/icon-256x256.png",
          revision: "9fadd16fbcf308494d52661bf5154a9c",
        },
        {
          url: "/icon-384x384.png",
          revision: "20950bd60b4b2477a55053d820f48c00",
        },
        {
          url: "/icon-512x512.png",
          revision: "9e9e28c4d2ba9ad8212b4cc2b10f8333",
        },
        {
          url: "/images/404-image.webp",
          revision: "8663c189320bfdb13bfdf35126353439",
        },
        {
          url: "/images/Fiverr-Logo.webp",
          revision: "a904557f6a680da9939e39e88f7747a9",
        },
        {
          url: "/images/Jio_TV.svg",
          revision: "6a2cad72fa4ed83854810d2f3cf6fdf4",
        },
        {
          url: "/images/UC-Logo.webp",
          revision: "08b10702ad3da4853d2d4331dc4d1ead",
        },
        {
          url: "/images/appointment-mockup.webp",
          revision: "158b6ca1fecb420925de525909c038ff",
        },
        {
          url: "/images/car_wash_service.svg",
          revision: "4f594fbeb70865de334a8dc9de680097",
        },
        {
          url: "/images/catering_service.svg",
          revision: "8863593b79ace29cacdd7788a566d596",
        },
        {
          url: "/images/default-profile-image.jpeg",
          revision: "2e955bc02acc4d65df26b9d372ad0c4b",
        },
        {
          url: "/images/driver_service.svg",
          revision: "514b4b1de962811eb239a527878aa64c",
        },
        {
          url: "/images/favicon.ico",
          revision: "8108c4c3182fc8d1b7a3f4d2c4e1b85e",
        },
        {
          url: "/images/gmeet.svg",
          revision: "8f94b515c7a8e6d512a99f296068ebc2",
        },
        {
          url: "/images/grooming-service.svg",
          revision: "056a43bae12c0815cbf32f8e8673af25",
        },
        {
          url: "/images/home-service.svg",
          revision: "0fc36f559a0800bb6956b9dea243db98",
        },
        {
          url: "/images/prices-mockup.webp",
          revision: "71cbeda4c5869e2889d6e305c1022513",
        },
        {
          url: "/images/promise-1.svg",
          revision: "d4caa072fbbf57f55b2e0dc64527a454",
        },
        {
          url: "/images/promise-2.svg",
          revision: "dfa1c4b2474ea665c87ba43bc8076678",
        },
        {
          url: "/images/promise-3.svg",
          revision: "641aa6b6cf9e4b934435c62d48956e9f",
        },
        {
          url: "/images/ratings-mockup.webp",
          revision: "3250be98624343c3e2b64fb16cf7b0ad",
        },
        {
          url: "/images/skype.svg",
          revision: "995fee33f53870ba19267018fc4ee1bc",
        },
        {
          url: "/images/teams.svg",
          revision: "bfc4996cd419ae43c238aebf2517b457",
        },
        {
          url: "/images/webex.svg",
          revision: "39991c6a3722aad47ff37051cc93a97a",
        },
        {
          url: "/images/webex_2.svg",
          revision: "34217a1a911bde978679c88265add188",
        },
        {
          url: "/images/what-we-believe-1.webp",
          revision: "e6a420ccada5e1df38c6775187a05b82",
        },
        {
          url: "/images/what-we-believe-2.webp",
          revision: "f494b10774b4121885ac31b3fdef7a95",
        },
        {
          url: "/images/what-we-believe-3.webp",
          revision: "66c12313db6d9bfe2e57bbc9b4ad54a4",
        },
        {
          url: "/images/zoom.svg",
          revision: "864ad8276a9f1a77404de70d13a2ed13",
        },
        {
          url: "/lottie/breakthrough-idea.json",
          revision: "5b69aa0095f3f16d38669ad044caf9e1",
        },
        {
          url: "/lottie/businessman-using-tablet.json",
          revision: "927462af60b71159101bfdbbb7ed4a47",
        },
        {
          url: "/lottie/coin-spin.json",
          revision: "ca88bd4c6dfe5eab53972208c91431c9",
        },
        {
          url: "/lottie/coins.json",
          revision: "f84eb54e9babcbc3ac36c7aec2ed2e7a",
        },
        {
          url: "/lottie/contact-info.json",
          revision: "66239c97f2486f94aee41a64788c8cbd",
        },
        {
          url: "/lottie/discount-info.json",
          revision: "2892236c2b646d08b90cb4631aec92f8",
        },
        {
          url: "/lottie/distance.json",
          revision: "ff4f253bc042d6323ab2486133a32c13",
        },
        {
          url: "/lottie/experience-info.json",
          revision: "88bfb610b44edb4fcefa517ef0cb89d8",
        },
        {
          url: "/lottie/gender-info.json",
          revision: "bd7064ab53fbd039599a9b3693248a8e",
        },
        {
          url: "/lottie/info-icon.json",
          revision: "e4b5db3cb573e2529e17ecb95d8c385b",
        },
        {
          url: "/lottie/location-info.json",
          revision: "5cadfae93eed9cf976ef5ebe864f04ca",
        },
        {
          url: "/lottie/man-holding-note.json",
          revision: "09cb009a3673f8561baff72af81c7b88",
        },
        {
          url: "/lottie/man-thinking-something.json",
          revision: "320bc38897c5dd38f37c016ef928337c",
        },
        {
          url: "/lottie/price-info.json",
          revision: "88e16e321b8ea8ff865e208261930908",
        },
        {
          url: "/lottie/pricing-type-info.json",
          revision: "27bcdc7f3f3cf34100bb8cf64db2e798",
        },
        {
          url: "/lottie/rating-chip-info.json",
          revision: "9872da0b1b2d37ef26ca8717eb12cfbe",
        },
        {
          url: "/lottie/requirements-info.json",
          revision: "1b4e549cdda1e3a3e3f75846ec48beea",
        },
        {
          url: "/lottie/service-home.json",
          revision: "14af9c92c298e8a5b8a560dd5731f221",
        },
        {
          url: "/lottie/service-offline.json",
          revision: "cc88bda1ba81c2d1324f6d512c923682",
        },
        {
          url: "/lottie/service-online-2.json",
          revision: "cb62eaf86c7077301e1bbe9d6c7b233b",
        },
        {
          url: "/lottie/service-online.json",
          revision: "92821847f05280aa9e366e68829c8777",
        },
        {
          url: "/lottie/visibility-chip-info.json",
          revision: "49ec80f2a5599276e62a843fd8f40c25",
        },
        {
          url: "/lottie/whats-included.json",
          revision: "6b26b440c43c5aad80fdf6d39edee9d6",
        },
        {
          url: "/lottie/whats-not-included.json",
          revision: "0d3c365e7ea2124b316e88b99724016a",
        },
        { url: "/manifest.json", revision: "f60ea19ade16e10ad797fa19708061f2" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
