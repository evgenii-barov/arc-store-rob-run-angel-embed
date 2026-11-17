(() => {
  'use strict';

  const SLUG = 'angel';
  const OFFER_API = 'https://api.arc-store.ru/api/v1/partners/angel';
  const TRACK_API = `https://api.arc-store.ru/api/v1/promoter-links/track/${SLUG}?storefront=ru`;
  const COOKIE_NAME = 'promoter_ref';
  const TRACKED_KEY = 'promoter_tracked';
  const COOKIE_DAYS = 30;

  const codeNode = document.getElementById('promo-code');
  const benefitNode = document.getElementById('promo-benefit');
  const descriptionNode = document.getElementById('offer-description');
  const copyButton = document.getElementById('copy-code');
  const copyStatus = document.getElementById('copy-status');

  function normalizedPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0 || number > 100) return null;
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(number);
  }

  function setOfferFallback() {
    benefitNode.textContent = 'Проверьте действующую скидку в корзине.';
    descriptionNode.textContent = 'Код можно скопировать уже сейчас. Актуальная скидка и итоговая сумма будут показаны в корзине до оплаты.';
  }

  async function loadOffer() {
    try {
      const response = await fetch(OFFER_API, {
        cache: 'no-store',
        credentials: 'omit',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Offer unavailable');

      const offer = await response.json();
      const code = typeof offer.code === 'string' && /^[A-Z0-9]{1,50}$/.test(offer.code)
        ? offer.code
        : 'ANGEL';
      const percent = normalizedPercent(offer.discount_percentage);

      codeNode.textContent = code;
      if (!percent) {
        setOfferFallback();
        return;
      }

      benefitNode.textContent = `${percent}% скидка на подходящие товары.`;
      descriptionNode.textContent = `Введите ${code} в корзине и проверьте скидку ${percent}% до оплаты. Условия применяются к подходящим позициям каталога.`;
    } catch {
      setOfferFallback();
    }
  }

  function setAttributionCookie() {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_DAYS);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(SLUG)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
  }

  async function trackReferral() {
    // Embedded/self-hosted copies never write attribution cookies for their
    // own domain. Tracking starts on ARC Store when a CTA with ?ref=angel is
    // opened, so this public package cannot create duplicate click records.
    if (!['arc-store.ru', 'www.arc-store.ru'].includes(window.location.hostname)) return;
    const params = new URLSearchParams(window.location.search);
    if ((params.get('ref') || '').toLowerCase() !== SLUG) return;

    setAttributionCookie();

    try {
      if (sessionStorage.getItem(TRACKED_KEY) === SLUG) return;
      sessionStorage.setItem(TRACKED_KEY, SLUG);
    } catch {
      // Cookie attribution still works when sessionStorage is unavailable.
    }

    try {
      const response = await fetch(TRACK_API, {
        cache: 'no-store',
        credentials: 'omit',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Tracking unavailable');
    } catch {
      try { sessionStorage.removeItem(TRACKED_KEY); } catch { /* no-op */ }
    }
  }

  async function copyCode() {
    const value = codeNode.textContent.trim() || 'ANGEL';
    try {
      await navigator.clipboard.writeText(value);
      copyButton.textContent = 'Код скопирован';
      copyStatus.textContent = `${value} сохранён в буфер обмена.`;
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeNode);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Код выделен — скопируйте его вручную.';
    }

    window.setTimeout(() => {
      copyButton.textContent = 'Скопировать код';
      copyStatus.textContent = '';
    }, 2600);
  }

  copyButton.addEventListener('click', copyCode);
  void loadOffer();
  void trackReferral();

  const embedParams = new URLSearchParams(window.location.search);
  const parentOrigin = embedParams.get('parentOrigin');
  const embedChannel = embedParams.get('arcChannel');
  let trustedParent = null;
  try {
    const parsed = new URL(parentOrigin || '');
    if (['http:', 'https:'].includes(parsed.protocol)) trustedParent = parsed.origin;
  } catch { /* Standalone page, not an embed. */ }
  if (trustedParent && embedChannel && window.parent !== window) {
    const reportHeight = () => window.parent.postMessage({
      type: 'arc-store-height',
      channel: embedChannel,
      height: Math.ceil(document.documentElement.scrollHeight),
    }, trustedParent);
    new ResizeObserver(reportHeight).observe(document.documentElement);
    window.addEventListener('load', reportHeight, { once: true });
    reportHeight();
  }
})();
