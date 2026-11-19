exports.handler = async function(event) {
    const data = JSON.parse(event.body);
    const BOT_TOKEN = "8961105900:AAGyzBZKir3YhdM0_sk4QCK5zOnWeNIJBq4";
    const CHAT_ID = "1478428788";

    const text = `🔥 Новая заявка с сайта!\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n✂️ Услуга: ${data.service}`;

    const response = await fetch(`https://telegram.org{BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    return {
        statusCode: response.ok ? 200 : 500,
        body: JSON.stringify({ ok: response.ok })
    };
};
