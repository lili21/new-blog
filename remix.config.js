const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("shiki/themes/nord.json");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  publicPath: "/build/",
  mdx: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
  },
};
