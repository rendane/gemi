const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// استفاده از http به جای https برای پورت پنل
const TARGET_SERVER = 'http://172.245.180.219:2053';

app.use('/', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    secure: false,
    ws: true,
    onError: (err, req, res) => {
        console.error('Proxy Error:', err.message);
        res.status(502).send(`ارتباط با سرور برقرار نشد. علت: ${err.message}`);
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
