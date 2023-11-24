// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://images.ygoprodeck.com',
//       headers: {
//         // 'Access-Control-Allow-Origin': '*',
//         crossorigin: 'anonymous',
//         // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//       },
//       changeOrigin: true,
//       pathRewrite: { '^/api': '' },
//     })
//   );
// };
