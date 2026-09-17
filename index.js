const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// هدایت ترافیک کانکشن WebSocket به پورت اینباند
app.use('/ws', createProxyMiddleware({
    target: 'https://172.245.180.219:2053',
    changeOrigin: true,
    secure: false,
    ws: true
}));

// هدایت پنل و لینک ساب‌سکریپشن به پورت 2096
app.use('/', createProxyMiddleware({
    target: 'https://172.245.180.219:2096',
    changeOrigin: true,
    secure: false,
    ws: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
