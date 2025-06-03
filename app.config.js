export default {
  expo: {
    name: "login-app",
    slug: "login-app",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            {
              family: "Cairo-Regular",
              file: "./assets/fonts/Cairo-Regular.ttf",
            },
            {
              family: "Cairo-Bold",
              file: "./assets/fonts/Cairo-Bold.ttf",
            },
          ],
        },
      ],
    ],
  },
};