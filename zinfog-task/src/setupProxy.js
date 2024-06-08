const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://accesslabbeta.stagingserverhub.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
