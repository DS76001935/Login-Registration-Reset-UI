// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api/auth",
//     createProxyMiddleware({
//       target: "http://localhost:8080",
//       changeOrigin: true,
//     })  
//   );
// };

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
      headers: {
        "Authorization": "Bearer my-auth-token",
      },
      onProxyReq: function(proxyReq, req, res) {
        // Do any additional processing of the request here
      },
      onProxyRes: function(proxyRes, req, res) {
        // Do any additional processing of the response here
      },
    })  
  );
};

