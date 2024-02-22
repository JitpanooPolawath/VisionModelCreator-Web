const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (config, env) {
  // Your other overrides, if any

  config.devServer = {
    ...config.devServer,
    // Add 'allowedHosts' option
    allowedHosts: ["http://127.0.0.1:5000", "localhost"],
    // Optionally, add a proxy if needed
    proxy: {
      "/api": createProxyMiddleware({
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      }),
    },
  };

  return config;
};
