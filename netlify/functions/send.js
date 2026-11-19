exports.handler = async function(event) {
    const data = JSON.parse(event.body);
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = "1478428788";

    if (!BOT_TOKEN) {
        return { statusCode: 500, body: "BOT_TOKEN пустой!" };
    }

    const text = `🔥 Новая заявка с сайта!\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n✂️ Услуга: ${data.service}`;

    const response = await fetch(`https://telegram.org{BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    const result = await response.text();
    return {
        statusCode: response.ok ? 200 : 500,
        body: result
    };
};
