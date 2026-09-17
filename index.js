const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// استفاده از https برای پورت دارای SSL
const TARGET_SERVER = 'https://172.245.180.219:2053';

app.use('/', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    secure: false,
    ws: true,
    onError: (err, req, res) => {
        console.error('Proxy Error:', err.message);
        res.status(502).send(
خطا در برقراری ارتباط: ${err.message}
);
    }
}));

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
