import qrcode from "./vendor/qrcode.mjs";

// The library encodes each UTF-16 unit as one byte by default; use real UTF-8
// so names like "Michał" survive in the contact card.
const utf8 = new TextEncoder();
qrcode.stringToBytes = (s) => Array.from(utf8.encode(s));

const DEVICES = { x3: [528, 792], x4: [480, 800] };
const FONT = 'Arial, "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif';

const I18N = {
  en: {
    title: "If-found overlay maker",
    lede: "A contact banner for the sleep screen of your Xteink e-reader running CrossPoint, so whoever finds it can get it back to you.",
    tabOverlay: "Sleep screen overlay",
    tabQr: "QR code only",
    contact: "Contact details",
    name: "Name",
    phone: "Phone",
    altPhone: "Alternative phone",
    email: "Email",
    optional: "optional",
    banner: "Banner",
    headline: "Headline",
    message: "Message",
    withQr: "Add a QR code with my contact card",
    position: "Position",
    top: "Top",
    middle: "Middle",
    bottom: "Bottom",
    device: "Device",
    qrOptions: "QR code",
    qrSize: "Size (pixels)",
    qrTransparent: "Transparent background",
    privacy: "Everything happens in this browser tab. Nothing you type is sent or stored anywhere.",
    preview: "Preview",
    bgPage: "Book page",
    bgCover: "Cover",
    bgNone: "Overlay only",
    download: "Download sleep-overlay.png",
    downloadQr: "Download contact-qr.png",
    howto: "Install it on the reader",
    step1: "Copy <code>sleep-overlay.png</code> to the root of the SD card. For several overlays picked at random, put them in a <code>.sleep-overlay</code> folder instead.",
    step2: "In CrossPoint, open <b>Settings → Display</b> and turn on <b>Sleep Screen Overlay</b>.",
    step3: "Pick any <b>Sleep Screen</b>: <b>Cover</b> shows your book's cover with the banner on top, <b>Current Screen</b> keeps the page you were reading.",
    step4: "Scan the QR code on the reader with your phone once, to check that it works.",
    firmwareNote: "The overlay toggle needs a CrossPoint build that includes it. On older builds, use the <b>Transparent</b> sleep screen instead.",
    footer: 'Free and open source. QR codes made with <a href="https://github.com/kazuhikoarase/qrcode-generator">qrcode-generator</a> (MIT). “QR Code” is a registered trademark of DENSO WAVE INCORPORATED.',
    defHeadline: "IF FOUND",
    defMessage: "please return to:",
    altLabel: "alt:",
    scan: "scan for contact",
    needPhone: "Add a phone number or an email so the finder can reach you.",
    tooLong: "Some text is too long for the banner and was cut. Try a shorter version.",
    qrInfo: (n, m) => `QR code: ${n}×${n} modules, ${m} px each.`,
    qrSizeInfo: (px) => `Image size: ${px}×${px} px (rounded so every module has whole pixels).`,
    qrTransparentWarn: "Phones read QR codes best on a light background. Keep one behind it.",
    coverTitle: "The Long Way Home",
    coverAuthor: "A Novel",
  },
  pl: {
    title: "Generator nakładki „jeśli znaleziono”",
    lede: "Baner z kontaktem na ekran uśpienia czytnika Xteink z CrossPoint, żeby znalazca mógł go do Ciebie oddać.",
    tabOverlay: "Nakładka wygaszacza",
    tabQr: "Tylko kod QR",
    contact: "Dane kontaktowe",
    name: "Imię i nazwisko",
    phone: "Telefon",
    altPhone: "Drugi telefon",
    email: "E-mail",
    optional: "opcjonalnie",
    banner: "Baner",
    headline: "Nagłówek",
    message: "Tekst",
    withQr: "Dodaj kod QR z moją wizytówką",
    position: "Położenie",
    top: "Góra",
    middle: "Środek",
    bottom: "Dół",
    device: "Urządzenie",
    qrOptions: "Kod QR",
    qrSize: "Rozmiar (piksele)",
    qrTransparent: "Przezroczyste tło",
    privacy: "Wszystko dzieje się w tej karcie przeglądarki. Nic, co wpiszesz, nie jest nigdzie wysyłane ani zapisywane.",
    preview: "Podgląd",
    bgPage: "Strona książki",
    bgCover: "Okładka",
    bgNone: "Sama nakładka",
    download: "Pobierz sleep-overlay.png",
    downloadQr: "Pobierz contact-qr.png",
    howto: "Instalacja na czytniku",
    step1: "Skopiuj <code>sleep-overlay.png</code> do głównego katalogu karty SD. Jeśli chcesz kilka losowanych nakładek, umieść je w folderze <code>.sleep-overlay</code>.",
    step2: "W CrossPoint otwórz <b>Ustawienia → Wyświetlacz</b> i włącz <b>Nakładka wygaszacza</b>.",
    step3: "Wybierz dowolny <b>Wygaszacz</b>: <b>Okładka</b> pokazuje okładkę książki z banerem, <b>Bieżący ekran</b> zostawia czytaną stronę.",
    step4: "Zeskanuj raz telefonem kod QR na czytniku, żeby sprawdzić, czy działa.",
    firmwareNote: "Przełącznik nakładki wymaga wersji CrossPoint, która go zawiera. W starszych wersjach użyj wygaszacza <b>Przezroczysty</b> (Transparent).",
    footer: 'Darmowe i open source. Kody QR tworzy <a href="https://github.com/kazuhikoarase/qrcode-generator">qrcode-generator</a> (MIT). „QR Code” jest zastrzeżonym znakiem towarowym DENSO WAVE INCORPORATED.',
    defHeadline: "JEŚLI ZNALEZIONO",
    defMessage: "proszę o kontakt:",
    altLabel: "tel. 2:",
    scan: "zeskanuj kontakt",
    needPhone: "Dodaj numer telefonu lub e-mail, żeby znalazca mógł się z Tobą skontaktować.",
    tooLong: "Część tekstu nie mieści się na banerze i została ucięta. Spróbuj krótszej wersji.",
    qrInfo: (n, m) => `Kod QR: ${n}×${n} modułów, po ${m} px.`,
    qrSizeInfo: (px) => `Rozmiar obrazu: ${px}×${px} px (zaokrąglony, żeby każdy moduł miał całe piksele).`,
    qrTransparentWarn: "Telefony najlepiej czytają kody QR na jasnym tle. Zostaw pod nim jasne tło.",
    coverTitle: "Długa droga do domu",
    coverAuthor: "Powieść",
  },
};

const $ = (id) => document.getElementById(id);
const form = $("form");
const preview = $("preview");
const deviceBox = $("device");
const statusEl = $("status");
const downloadBtn = $("download");

let lang = navigator.language?.toLowerCase().startsWith("pl") ? "pl" : "en";
let mode = "overlay";
const edited = { headline: false, message: false };
let lastOutput = null; // { canvas, filename }

const t = (key) => I18N[lang][key];

// ---------------------------------------------------------------- inputs

function readState() {
  const val = (id) => $(id).value.trim();
  const radio = (name) => form.querySelector(`input[name="${name}"]:checked`)?.value;
  return {
    name: val("name"),
    phone: val("phone"),
    altPhone: val("altPhone"),
    email: val("email"),
    headline: val("headline"),
    message: val("message"),
    withQr: $("withQr").checked,
    position: radio("position"),
    device: radio("device"),
    bg: document.querySelector('input[name="bg"]:checked')?.value,
    qrSize: Math.min(2000, Math.max(100, Number($("qrSize").value) || 400)),
    qrTransparent: $("qrTransparent").checked,
  };
}

// ---------------------------------------------------------------- vCard + QR

function vEscape(s) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
}

function buildVCard(s) {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (s.name) {
    const parts = s.name.split(/\s+/);
    const family = parts.length > 1 ? parts.pop() : "";
    lines.push(`N:${vEscape(family)};${vEscape(parts.join(" "))};;;`, `FN:${vEscape(s.name)}`);
  } else {
    lines.push("N:;;;;", "FN:");
  }
  if (s.phone) lines.push(`TEL;TYPE=CELL,PREF:${vEscape(s.phone)}`);
  if (s.altPhone) lines.push(`TEL;TYPE=CELL:${vEscape(s.altPhone)}`);
  if (s.email) lines.push(`EMAIL:${vEscape(s.email)}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function makeQr(text) {
  const qr = qrcode(0, "M");
  qr.addData(text, "Byte");
  qr.make();
  return { count: qr.getModuleCount(), isDark: (r, c) => qr.isDark(r, c) };
}

function drawQr(ctx, qr, x, y, module, dark = "#000") {
  ctx.fillStyle = dark;
  for (let r = 0; r < qr.count; r++) {
    for (let c = 0; c < qr.count; c++) {
      if (qr.isDark(r, c)) ctx.fillRect(x + c * module, y + r * module, module, module);
    }
  }
}

// ---------------------------------------------------------------- overlay image

// E-ink sleep overlays look best as pure black/white/transparent: grey
// anti-aliasing turns into dithering noise on the panel. Snap every pixel.
function snapToBlackWhite(canvas) {
  const ctx = canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) {
      d[i] = d[i + 1] = d[i + 2] = d[i + 3] = 0;
      continue;
    }
    const v = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114 < 128 ? 0 : 255;
    d[i] = d[i + 1] = d[i + 2] = v;
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

function fitFont(ctx, text, weight, size, maxWidth, minSize = 12) {
  let s = size;
  for (; s > minSize; s--) {
    ctx.font = `${weight} ${s}px ${FONT}`;
    if (ctx.measureText(text).width <= maxWidth) return { size: s, clipped: false };
  }
  ctx.font = `${weight} ${minSize}px ${FONT}`;
  return { size: minSize, clipped: ctx.measureText(text).width > maxWidth };
}

function renderOverlay(s) {
  const [W, H] = DEVICES[s.device] || DEVICES.x3;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const margin = 10;
  const warnings = [];
  let qr = null;
  let module = 0;
  let qrPx = 0;

  const hasContact = s.phone || s.email || s.altPhone;
  if (s.withQr && hasContact) {
    qr = makeQr(buildVCard(s));
    module = Math.max(2, Math.floor(Math.min(190, W * 0.36) / qr.count));
    qrPx = qr.count * module;
  }
  // The white banner doubles as the QR quiet zone, which should be 4 modules.
  const pad = Math.max(14, qr ? module * 4 : 0);
  const captionH = qr ? 24 : 0;
  const gap = 16;
  const textX = margin + pad + 4;
  const textRight = qr ? W - margin - pad - qrPx - gap : W - margin - pad;
  const textW = textRight - textX;

  // Text lines: [text, weight, size, spacingAfter]
  const lines = [];
  if (s.headline) lines.push([s.headline, 700, 34, 8]);
  if (s.message) lines.push([s.message, 400, 20, 6]);
  if (s.phone) lines.push([s.phone, 700, 30, 10]);
  const details = [];
  if (s.name) details.push([s.name, 700, 19, 5]);
  if (s.altPhone) details.push([`${t("altLabel")} ${s.altPhone}`, 400, 17, 4]);
  if (s.email) details.push([s.email, 400, 17, 4]);

  ctx.textBaseline = "top";
  const measured = [];
  let textH = 0;
  for (const [text, weight, size, after] of lines) {
    const fit = fitFont(ctx, text, weight, size, textW);
    if (fit.clipped) warnings.push("tooLong");
    measured.push({ text, weight, size: fit.size, after });
    textH += Math.round(fit.size * 1.15) + after;
  }
  const dividerH = lines.length && details.length ? 12 : 0;
  textH += dividerH;
  const measuredDetails = [];
  for (const [text, weight, size, after] of details) {
    const fit = fitFont(ctx, text, weight, size, textW);
    if (fit.clipped) warnings.push("tooLong");
    measuredDetails.push({ text, weight, size: fit.size, after });
    textH += Math.round(fit.size * 1.15) + after;
  }

  const innerH = Math.max(textH, qr ? qrPx + captionH : 0, 40);
  const bannerH = innerH + pad * 2;
  const y0 = s.position === "bottom" ? H - margin - bannerH : s.position === "middle" ? Math.round((H - bannerH) / 2) : margin;

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(margin + 1.5, y0 + 1.5, W - 2 * margin - 3, bannerH - 3, 12);
  ctx.fill();
  ctx.stroke();

  if (qr) {
    const qx = W - margin - pad - qrPx;
    const qy = y0 + pad + Math.round((innerH - qrPx - captionH) / 2);
    drawQr(ctx, qr, qx, qy, module);
    ctx.fillStyle = "#000";
    ctx.font = `400 14px ${FONT}`;
    const cw = ctx.measureText(t("scan")).width;
    ctx.fillText(t("scan"), qx + (qrPx - cw) / 2, qy + qrPx + 7);
  }

  let y = y0 + pad + Math.round((innerH - textH) / 2);
  ctx.fillStyle = "#000";
  for (const m of measured) {
    ctx.font = `${m.weight} ${m.size}px ${FONT}`;
    ctx.fillText(m.text, textX, y, textW);
    y += Math.round(m.size * 1.15) + m.after;
  }
  if (dividerH) {
    ctx.fillRect(textX, y, textW, 2);
    y += dividerH;
  }
  for (const m of measuredDetails) {
    ctx.font = `${m.weight} ${m.size}px ${FONT}`;
    ctx.fillText(m.text, textX, y, textW);
    y += Math.round(m.size * 1.15) + m.after;
  }

  snapToBlackWhite(canvas);
  if (!hasContact) warnings.push("needPhone");
  return { canvas, warnings, qr, module };
}

// ---------------------------------------------------------------- preview backgrounds

function seededRandom(seed) {
  let x = seed;
  return () => ((x = (x * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
}

function drawBookPage(ctx, W, H) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, W, H);
  const rand = seededRandom(7);
  ctx.fillStyle = "#3a3a3a";
  const left = 34;
  const right = W - 34;
  let y = 46;
  while (y < H - 50) {
    const paragraphLines = 4 + Math.floor(rand() * 6);
    for (let l = 0; l < paragraphLines && y < H - 50; l++) {
      let x = l === 0 ? left + 22 : left;
      const lastLine = l === paragraphLines - 1;
      const end = lastLine ? left + (right - left) * (0.3 + rand() * 0.5) : right;
      while (x < end - 12) {
        const w = Math.min(10 + rand() * 46, end - x);
        ctx.fillRect(x, y, w, 9);
        x += w + 7;
      }
      y += 24;
    }
    y += 8;
  }
  ctx.fillStyle = "#777";
  ctx.font = `400 13px ${FONT}`;
  ctx.fillText("42 / 318", W / 2 - 22, H - 22);
}

function drawCover(ctx, W, H) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#d9d9d9");
  g.addColorStop(0.55, "#8c8c8c");
  g.addColorStop(1, "#2e2e2e");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // Hills
  ctx.fillStyle = "#555";
  ctx.beginPath();
  ctx.moveTo(0, H * 0.72);
  ctx.bezierCurveTo(W * 0.3, H * 0.6, W * 0.55, H * 0.8, W, H * 0.66);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.fill();
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.moveTo(0, H * 0.84);
  ctx.bezierCurveTo(W * 0.4, H * 0.76, W * 0.7, H * 0.9, W, H * 0.8);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.fill();
  // Sun
  ctx.fillStyle = "#f2f2f2";
  ctx.beginPath();
  ctx.arc(W * 0.7, H * 0.5, W * 0.09, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111";
  ctx.textAlign = "center";
  ctx.font = `700 40px Georgia, "Times New Roman", serif`;
  ctx.fillText(t("coverTitle"), W / 2, H * 0.36, W - 60);
  ctx.font = `400 20px Georgia, "Times New Roman", serif`;
  ctx.fillText(t("coverAuthor"), W / 2, H * 0.36 + 36);
  ctx.textAlign = "start";
}

// ---------------------------------------------------------------- render

function setStatus(messages, warn) {
  statusEl.textContent = messages.join(" ");
  statusEl.classList.toggle("warn", Boolean(warn));
}

function render() {
  const s = readState();
  if (mode === "overlay") {
    const { canvas, warnings, qr, module } = renderOverlay(s);
    preview.width = canvas.width;
    preview.height = canvas.height;
    const ctx = preview.getContext("2d");
    ctx.clearRect(0, 0, preview.width, preview.height);
    if (s.bg === "page") drawBookPage(ctx, preview.width, preview.height);
    else if (s.bg === "cover") drawCover(ctx, preview.width, preview.height);
    ctx.drawImage(canvas, 0, 0);
    deviceBox.classList.toggle("checker", s.bg === "none");
    deviceBox.classList.remove("bare");

    const msgs = [...new Set(warnings)].map((w) => t(w));
    if (!msgs.length && qr) msgs.push(t("qrInfo")(qr.count, module));
    setStatus(msgs, warnings.length);
    downloadBtn.disabled = warnings.includes("needPhone");
    lastOutput = { canvas, filename: "sleep-overlay.png" };
  } else {
    const hasContact = s.phone || s.email || s.altPhone;
    if (!hasContact) {
      preview.width = preview.height = 300;
      preview.getContext("2d").clearRect(0, 0, 300, 300);
      setStatus([t("needPhone")], true);
      downloadBtn.disabled = true;
      lastOutput = null;
      deviceBox.classList.add("bare", "checker");
      return;
    }
    const qr = makeQr(buildVCard(s));
    const quiet = 4;
    const module = Math.max(1, Math.floor(s.qrSize / (qr.count + quiet * 2)));
    const px = module * (qr.count + quiet * 2);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext("2d");
    if (!s.qrTransparent) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, px, px);
    }
    drawQr(ctx, qr, quiet * module, quiet * module, module);

    preview.width = preview.height = px;
    const pctx = preview.getContext("2d");
    pctx.clearRect(0, 0, px, px);
    pctx.drawImage(canvas, 0, 0);
    deviceBox.classList.add("bare");
    deviceBox.classList.toggle("checker", s.qrTransparent);

    const msgs = [t("qrInfo")(qr.count, module), t("qrSizeInfo")(px)];
    if (s.qrTransparent) msgs.push(t("qrTransparentWarn"));
    setStatus(msgs, false);
    downloadBtn.disabled = false;
    lastOutput = { canvas, filename: "contact-qr.png" };
  }
}

// ---------------------------------------------------------------- i18n + UI wiring

function applyLang(next) {
  lang = next;
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll("[data-i18n]")) el.textContent = t(el.dataset.i18n);
  for (const el of document.querySelectorAll("[data-i18n-html]")) el.innerHTML = t(el.dataset.i18nHtml);
  for (const b of document.querySelectorAll("[data-lang]")) b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  if (!edited.headline) $("headline").value = t("defHeadline");
  if (!edited.message) $("message").value = t("defMessage");
  downloadBtn.textContent = mode === "overlay" ? t("download") : t("downloadQr");
  render();
}

function setMode(next) {
  mode = next;
  $("tab-overlay").setAttribute("aria-selected", String(mode === "overlay"));
  $("tab-qr").setAttribute("aria-selected", String(mode === "qr"));
  for (const el of document.querySelectorAll(".overlay-only")) el.hidden = mode !== "overlay";
  for (const el of document.querySelectorAll(".qr-only")) el.hidden = mode !== "qr";
  downloadBtn.textContent = mode === "overlay" ? t("download") : t("downloadQr");
  render();
}

function download() {
  if (!lastOutput) return;
  lastOutput.canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = lastOutput.filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}

$("headline").addEventListener("input", () => (edited.headline = true));
$("message").addEventListener("input", () => (edited.message = true));
form.addEventListener("input", render);
form.addEventListener("change", render);
form.addEventListener("submit", (e) => e.preventDefault());
document.querySelector(".preview-head").addEventListener("change", render);
for (const b of document.querySelectorAll("[data-lang]")) b.addEventListener("click", () => applyLang(b.dataset.lang));
$("tab-overlay").addEventListener("click", () => setMode("overlay"));
$("tab-qr").addEventListener("click", () => setMode("qr"));
downloadBtn.addEventListener("click", download);

applyLang(lang);
