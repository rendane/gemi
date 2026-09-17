const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const TARGET_IP = '172.245.180.219';

// ۱. اینباند VLESS (مسیر ws-vless/ به پورت 2087)
app.use('/ws-vless', createProxyMiddleware({
    target: `https://${TARGET_IP}:2087`,
    changeOrigin: true,
    secure: false,
    ws: true
}));

// ۲. اینباند Trojan (مسیر ws-trojan/ به پورت 8443)
app.use('/ws-trojan', createProxyMiddleware({
    target: `https://${TARGET_IP}:8443`,
    changeOrigin: true,
    secure: false,
    ws: true
}));

// ۳. اینباند VMess (مسیر ws/ به پورت 2083)
app.use('/ws', createProxyMiddleware({
    target: `https://${TARGET_IP}:2083`,
    changeOrigin: true,
    secure: false,
    ws: true
}));

// ۴. لینک‌های ساب‌سکریپشن (مسیر jon/ به پورت 2096)
app.use('/jon', createProxyMiddleware({
    target: `https://${TARGET_IP}:2096`,
    changeOrigin: true,
    secure: false,
    ws: true
}));

// ۵. صفحه ورود به پنل 3x-UI (ریشه سایت / به پورت 2053)
app.use('/', createProxyMiddleware({
    target: `https://${TARGET_IP}:2053`,
    changeOrigin: true,
    secure: false,
    ws: true
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
