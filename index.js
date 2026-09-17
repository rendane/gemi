const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
// آدرس و پورت دقیق پنل
const TARGET_SERVER = 'https://172.245.180.219:2053';

app.use('/', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    secure: false, // نادیده گرفتن گواهی SSL خودامضا سرور
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'hey.celpipassistant.study');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
