export default {
  async fetch(request, env) {
    const BOT_TOKEN = "8506152675:AAFt9VTtv9J0Y-dQghcGvbGc3luprVj84bA";
    const CHAT_ID = "6190943626";
    const SITE_NAME = "İZMİR LASTİK YOL YARDIM";
    const RAW_BASE = "https://raw.githubusercontent.com/sandalcigiray5-oss/iz1/main/";

    // 1. ANALİZ RAPORU VE KV KAYDI (POST)
    if (request.method === "POST") {
      try {
        const d = await request.json();
        const timestamp = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
        
        const report = `
📊 *PROFESYONEL ANALİZ RAPORU (${SITE_NAME})*
────────────────────
🌍 *Konum:* ${d.city} / ${d.country}
🌐 *IP:* \`${d.ip}\`
🔗 *Referans:* ${d.referrer || 'Doğrudan Giriş'}
📱 *Cihaz:* ${d.userAgent.substring(0, 50)}...
🖥 *Ekran:* ${d.screenW}x${d.screenH}
🌐 *Dil:* ${d.lang}
⏰ *Saat:* ${timestamp}
────────────────────`;

        if (env.GIRISLER) {
          const kvKey = `giriş_${Date.now()}`;
          const kvValue = JSON.stringify({ ...d, time: timestamp });
          await env.GIRISLER.put(kvKey, kvValue);
        }

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: report, parse_mode: 'Markdown' })
        });
        return new Response("OK", { status: 200 });
      } catch (e) { return new Response("Error", { status: 500 }); }
    }

    // 2. SAYFA YÜKLENDİĞİNDE (GET)
    const ip = request.headers.get("cf-connecting-ip") || "Gizli";
    const city = request.headers.get("cf-ipcity") || "Bilinmiyor";
    const country = request.headers.get("cf-ipcountry") || "TR";

    if (env.GIRISLER) {
      const quickKey = `hit_${Date.now()}`;
      await env.GIRISLER.put(quickKey, `IP: ${ip} | Şehir: ${city} | Zaman: ${new Date().toISOString()}`);
    }

    const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>İzmir Lastik Yol Yardım | 0544 391 12 44</title>

<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18001084840"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18001084840');
</script>

<script>
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-18001084840/Rws6CPjcgoUcEKiDy4dD',
      'value': 1.0,
      'currency': 'TRY',
      'event_callback': callback
  });
  return false;
}
</script>

<style>
:root { --ana-sari: #ffcc00; --koyu-bg: #0d0d0d; --kart-bg: #1a1a1a; --ara: #e31e24; --wp: #25d366; }
body, html { margin:0; padding:0; background-color:var(--koyu-bg); color:#fff; font-family:'Arial Black', sans-serif; -webkit-tap-highlight-color:transparent; scroll-behavior:smooth; }
.bg-fixed { position:fixed; top:0; left:0; width:100%; height:100%; background:linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('${RAW_BASE}arka-plan-lastik.jpg'); background-size:cover; background-position:center; z-index:-1; }
.header { padding:20px 15px; display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid var(--ana-sari); background:rgba(0,0,0,0.8); position:sticky; top:0; z-index:1000; backdrop-filter:blur(5px); }
.header .title-group h1 { color:var(--ana-sari); margin:0; font-size:20px; line-height:1.1; text-shadow:2px 2px 4px #000; }
.header .title-group p { color:#fff; margin:5px 0 0 0; font-size:12px; font-weight:bold; font-family:Arial, sans-serif; }
.header .phone-top { background:var(--ara); color:#fff; padding:10px 12px; border-radius:8px; text-decoration:none; font-size:16px; display:flex; flex-direction:column; align-items:center; animation:pulse 2s infinite; }
.header .phone-top span { font-size:10px; font-weight:normal; }
.info-bar { background:rgba(255,204,0,0.1); margin:15px; padding:15px; border-radius:10px; border:1px dashed var(--ana-sari); text-align:center; }
.info-bar b { color:var(--ana-sari); font-size:18px; }
.kare-izgara { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; padding:15px; padding-bottom:120px; }
.kare-kart { background:var(--kart-bg); border-radius:12px; overflow:hidden; border:1px solid #333; aspect-ratio:1/1; }
.kare-kart img { width:100%; height:100%; object-fit:cover; }
.footer-nav { position:fixed; bottom:0; left:0; width:100%; display:grid; grid-template-columns:1fr 1fr; height:80px; z-index:10000; box-shadow:0 -5px 25px rgba(0,0,0,0.8); }
.btn { display:flex; flex-direction:column; align-items:center; justify-content:center; text-decoration:none; color:white; font-weight:900; font-size:18px; }
.btn-ara { background:var(--ara); } .btn-wp { background:var(--wp); }
.btn span { font-size:11px; font-family:Arial, sans-serif; font-weight:normal; opacity:0.9; }
@keyframes pulse { 0%{transform:scale(1);} 50%{transform:scale(1.05); box-shadow:0 0 20px rgba(227,30,36,0.6);} 100%{transform:scale(1);} }
</style>
</head>

<body>
<div class="bg-fixed"></div>

<div class="header">
    <div class="title-group">
        <h1>İZMİR LASTİK<br>YOL YARDIM</h1>
        <p>7/24 MOBİL SERVİS</p>
    </div>
    <a href="tel:05443911244" onclick="return gtag_report_conversion('tel:05443911244');" class="phone-top">0544 391 12 44<span>Tıkla Hemen Ara</span></a>
</div>

<div class="info-bar">
    📍 <b>Konum Gönderin</b><br>
    En yakın mobil ekibimiz 15 dakikada yanınızda!
</div>

<div class="kare-izgara">
    <div class="kare-kart"><img src="${RAW_BASE}lastik1.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik2.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik3.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik4.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik5.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik6.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik7.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik8.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik9.jpg"></div>
    <div class="kare-kart"><img src="${RAW_BASE}lastik10.jpg"></div>
</div>

<div class="footer-nav">
    <a href="tel:05443911244" onclick="return gtag_report_conversion('tel:05443911244');" class="btn btn-ara">📞 ARA<span>0544 391 12 44</span></a>
    <a href="https://wa.me/905443911244?text=Merhaba, İzmir acil lastik yardımı lazım." class="btn btn-wp">💬 WHATSAPP<span>Konum Gönder</span></a>
</div>

<script>
async function runAnalytics() {
    const payload = {
        ip: "${ip}", city: "${city}", country: "${country}",
        userAgent: navigator.userAgent, referrer: document.referrer,
        screenW: window.screen.width, screenH: window.screen.height, lang: navigator.language
    };
    await fetch(window.location.href, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
}
window.onload = runAnalytics;

window.addEventListener('pagehide', function() {
    navigator.sendBeacon('https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=' + encodeURIComponent('🚪 *Ayrıldı:* ${SITE_NAME}\\n🌐 IP: ${ip}') + '&parse_mode=Markdown');
});
</script>
</body>
</html>`;

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
