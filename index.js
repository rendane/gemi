const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const TARGET_SERVER = 'http://172.245.180.219';

app.use('/', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    ws: true, // پشتیبانی از WebSocket
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'hey.celpipassistant.study');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});