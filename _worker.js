export default {
  async fetch(request, env) {
    const BOT_TOKEN = "8506152675:AAFt9VTtv9J0Y-dQghcGvbGc3luprVj84bA";
    const CHAT_ID = "6190943626";
    const SITE_NAME = "İZMİR LASTİK YOL YARDIM";
    const RAW_BASE = "https://raw.githubusercontent.com/sandalcigiray5-oss/iz1/main/";

    if (request.method === "POST") {
      try {
        const d = await request.json();
        const report = `
📊 *YENİ ZİYARETÇİ: ${SITE_NAME}*
────────────────────
🌍 *Konum:* ${d.city} / ${d.country}
🌐 *IP:* \`${d.ip}\`
🔗 *Kaynak:* ${d.referrer || 'Doğrudan Giriş'}
📱 *Cihaz:* ${d.userAgent.substring(0, 50)}...
🖥 *Ekran:* ${d.screenW}x${d.screenH}
🌐 *Dil:* ${d.lang}
⏰ *Saat:* ${new Date().toLocaleTimeString('tr-TR')}
────────────────────`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: report, parse_mode: 'Markdown' })
        });
        return new Response("OK", { status: 200 });
      } catch (e) { return new Response("Error", { status: 500 }); }
    }

    const ip = request.headers.get("cf-connecting-ip") || "Gizli";
    const city = request.headers.get("cf-ipcity") || "Bilinmiyor";
    const country = request.headers.get("cf-ipcountry") || "TR";

    const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>İzmir Lastik Yol Yardım | 0544 391 12 44</title>

<style>
:root { --ana-sari: #ffcc00; --koyu-bg: #0d0d0d; --kart-bg: #1a1a1a; --ara: #e31e24; --wp: #25d366; }
body, html { margin:0; padding:0; background-color:var(--koyu-bg); color:#fff; font-family:'Arial Black', sans-serif; }
.bg-fixed { position:fixed; top:0; left:0; width:100%; height:100%; background:linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('${RAW_BASE}arka-plan-lastik.jpg'); background-size:cover; background-position:center; z-index:-1; }
.header { padding:20px 15px; display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid var(--ana-sari); background:rgba(0,0,0,0.7); position:sticky; top:0; z-index:1000; }
.header h1 { color:var(--ana-sari); margin:0; font-size:20px; line-height:1.1; }
.phone-top { background:var(--ara); color:#fff; padding:10px 12px; border-radius:8px; text-decoration:none; text-align:center; font-size:16px; animation:pulse 2s infinite; }
.kare-izgara { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; padding:15px; padding-bottom:120px; }
.kare-kart { background:var(--kart-bg); border-radius:12px; overflow:hidden; aspect-ratio:1/1; }
.kare-kart img { width:100%; height:100%; object-fit:cover; }
.footer-nav { position:fixed; bottom:0; left:0; width:100%; display:grid; grid-template-columns:1fr 1fr; height:80px; z-index:10000; }
.btn { display:flex; flex-direction:column; align-items:center; justify-content:center; text-decoration:none; color:white; font-weight:900; font-size:18px; }
.btn-ara { background:var(--ara); } .btn-wp { background:var(--wp); }
@keyframes pulse { 0%{transform:scale(1);} 50%{transform:scale(1.05);} 100%{transform:scale(1);} }
</style>
</head>

<body>
<div class="bg-fixed"></div>
<div class="header">
    <div><h1>İZMİR LASTİK<br>YOL YARDIM</h1></div>
    <a href="tel:05443911244" class="phone-top">0544 391 12 44</a>
</div>

<div class="kare-izgara">
    <div class="kare-kart"><img src="${RAW_BASE}lastik1.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik2.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik3.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik4.jpg"></div>
</div>

<div class="footer-nav">
    <a href="tel:05443911244" class="btn btn-ara">📞 ARA</a>
    <a href="https://wa.me/905443911244" class="btn btn-wp">💬 WHATSAPP</a>
</div>

<script>
async function report() {
    const d = {
        ip: "${ip}", city: "${city}", country: "${country}",
        userAgent: navigator.userAgent, referrer: document.referrer,
        screenW: window.screen.width, screenH: window.screen.height, lang: navigator.language
    };
    await fetch(window.location.href, { method: 'POST', body: JSON.stringify(d) });
}
window.onload = report;
window.addEventListener('pagehide', function() {
    navigator.sendBeacon('https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=' + encodeURIComponent('🚪 *Ayrıldı:* ${SITE_NAME}\\n🌐 IP: ${ip}') + '&parse_mode=Markdown');
});
</script>
</body>
</html>`;

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
