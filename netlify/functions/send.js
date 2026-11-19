const https = require('https');

exports.handler = async function(event) {
    const data = JSON.parse(event.body);
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = "1478428788";

    if (!BOT_TOKEN) {
        return { statusCode: 500, body: "BOT_TOKEN пустой!" };
    }

    const text = `🔥 Новая заявка с сайта!\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n✂️ Услуга: ${data.service}`;
    const postData = JSON.stringify({ chat_id: CHAT_ID, text: text });

    return new Promise((resolve) => {
        const req = https.request({
            hostname: 'api.telegram.org',
            path: `/bot${BOT_TOKEN}/sendMessage`,
            method: 'POST',
            family: 4,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode === 200 ? 200 : 500,
                    body: body
                });
            });
        });

        req.on('error', (err) => {
            resolve({ statusCode: 500, body: err.message });
        });

        req.write(postData);
        req.end();
    });
};
