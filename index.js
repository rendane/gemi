const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// استفاده از https به همراه نادیده گرفتن گواهی SSL خودامضا
const TARGET_SERVER = 'https://172.245.180.219:2053';

app.use('/', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    secure: false, // نادیده گرفتن گواهی SSL نامعتبر/خودامضا سرور
    ws: true,
    onError: (err, req, res) => {
        console.error('Proxy Error:', err.message);
        res.status(502).send(`ارتباط با سرور برقرار نشد: ${err.message}`);
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
