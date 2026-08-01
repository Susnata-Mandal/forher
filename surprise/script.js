/* ============================================================
   Wiring for the surprise site. Reads all its content from
   SURPRISE_CONFIG (config.js) — edit that file, not this one.
   ============================================================ */

(function () {
  'use strict';

  const cfg = SURPRISE_CONFIG;

  // ---------------- Screen navigation ----------------
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const target = document.getElementById('screen-' + id);
    if (target) target.classList.add('active');
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-target]');
    if (el) showScreen(el.getAttribute('data-target'));
  });

  // ---------------- Lock screen ----------------
  const passcode = String(cfg.passcode || '1409').replace(/\D/g, '');
  let entered = '';

  const dotsEl = document.getElementById('passcodeDots');
  const lockTitleEl = document.getElementById('lockTitle');
  const lockHintEl = document.getElementById('lockHint');
  const keypadEl = document.getElementById('keypad');

  if (lockHintEl) lockHintEl.textContent = cfg.lockHint || 'for your eyes only ♡';

  function renderDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i < passcode.length; i++) {
      const d = document.createElement('span');
      d.className = 'dot' + (i < entered.length ? ' filled' : '');
      dotsEl.appendChild(d);
    }
  }
  renderDots();

  function wrongPasscode() {
    if (lockTitleEl) lockTitleEl.textContent = 'wrong passcode — try again';
    dotsEl.classList.add('shake');
    setTimeout(() => {
      dotsEl.classList.remove('shake');
      entered = '';
      renderDots();
      if (lockTitleEl) lockTitleEl.textContent = 'enter a passcode';
    }, 500);
  }

  function checkPasscode() {
    if (entered === passcode) {
      setTimeout(() => showScreen('hub'), 200);
    } else {
      setTimeout(wrongPasscode, 150);
    }
  }

  if (keypadEl) {
    keypadEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-key]');
      if (!btn) return;
      const key = btn.getAttribute('data-key');

      if (key === 'clear') {
        entered = '';
      } else if (key === 'back') {
        entered = entered.slice(0, -1);
      } else if (entered.length < passcode.length) {
        entered += key;
      }
      renderDots();
      if (entered.length === passcode.length) checkPasscode();
    });
  }

  // ---------------- Notes ----------------
  const noteTitleEl = document.getElementById('noteTitle');
  const noteTextEl = document.getElementById('noteText');
  if (noteTitleEl) noteTitleEl.textContent = cfg.note?.title || '';
  if (noteTextEl) noteTextEl.textContent = cfg.note?.text || '';

  // ---------------- Song ----------------
  function extractYouTubeId(input) {
    if (!input) return null;
    const trimmed = input.trim();
    if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
      /(?:youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/embed\/)([\w-]{11})/
    ];
    for (const p of patterns) {
      const m = trimmed.match(p);
      if (m) return m[1];
    }
    return null;
  }

  const songTitleEl = document.getElementById('songTitle');
  const songCaptionEl = document.getElementById('songCaption');
  const videoFrameEl = document.getElementById('videoFrame');

  if (songTitleEl) songTitleEl.textContent = cfg.song?.title || '';
  if (songCaptionEl) songCaptionEl.textContent = cfg.song?.caption || '';

  function isLocalVideoFile(input) {
    return !!input && /\.(mp4|webm|ogg|mov)$/i.test(input.trim());
  }

  if (videoFrameEl) {
    const rawSong = cfg.song?.youtubeId;
    const ytId = extractYouTubeId(rawSong);

    if (isLocalVideoFile(rawSong)) {
      // Local video file sitting next to index.html (e.g. an mp4 you exported).
      const video = document.createElement('video');
      video.src = encodeURI(rawSong.trim());
      video.controls = true;
      video.playsInline = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      videoFrameEl.appendChild(video);
    } else if (ytId) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${ytId}`;
      iframe.title = cfg.song?.title || 'song';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoFrameEl.appendChild(iframe);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'video-placeholder';
      placeholder.innerHTML = '🎵<br>add your song\'s YouTube link, or a local .mp4 filename, in config.js';
      videoFrameEl.appendChild(placeholder);
    }
  }

  // ---------------- Jar of Love ----------------
  const jarNameEl = document.getElementById('jarName');
  const jarHeartsEl = document.getElementById('jarHearts');
  const jarRevealOverlay = document.getElementById('jarRevealOverlay');
  const jarRevealText = document.getElementById('jarRevealText');
  const jarRevealClose = document.getElementById('jarRevealClose');

  if (jarNameEl) jarNameEl.textContent = cfg.toName || 'you';

  if (jarHeartsEl && Array.isArray(cfg.loveReasons)) {
    cfg.loveReasons.forEach((reason) => {
      const btn = document.createElement('button');
      btn.className = 'jar-heart-btn';
      btn.textContent = reason.label;
      btn.addEventListener('click', () => {
        jarRevealText.textContent = reason.message;
        jarRevealOverlay.classList.add('visible');
      });
      jarHeartsEl.appendChild(btn);
    });
  }

  if (jarRevealClose) {
    jarRevealClose.addEventListener('click', () => jarRevealOverlay.classList.remove('visible'));
  }

  // ---------------- Photos ----------------
  const photoGridEl = document.getElementById('photoGrid');
  const photoCaptionEl = document.getElementById('photoCaption');
  if (photoCaptionEl) photoCaptionEl.textContent = cfg.photoCaption || '';

  if (photoGridEl && Array.isArray(cfg.photos)) {
    cfg.photos.forEach((photo) => {
      const tile = document.createElement('div');
      tile.className = 'photo-tile';
      if (photo.src) {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt || '';
        tile.appendChild(img);
      } else {
        const label = document.createElement('span');
        label.className = 'placeholder-label';
        label.textContent = photo.alt || '📷';
        tile.appendChild(label);
      }
      photoGridEl.appendChild(tile);
    });
  }

  // ---------------- Award ----------------
  const awardKindEl = document.getElementById('awardKind');
  const awardNameEl = document.getElementById('awardName');
  const awardMsgEl = document.getElementById('awardMsg');
  const awardEyebrowEl = document.getElementById('awardEyebrow');
  const awardDotsEl = document.getElementById('awardDots');
  const awardPrevBtn = document.getElementById('awardPrev');
  const awardNextBtn = document.getElementById('awardNext');

  const awardEntries = (cfg.award && cfg.award.entries && cfg.award.entries.length)
    ? cfg.award.entries
    : [{ name: '', message: '' }];
  let awardIndex = 0;

  function renderAward() {
    const entry = awardEntries[awardIndex];
    if (awardKindEl) awardKindEl.textContent = cfg.award?.kind || 'Partner';
    if (awardNameEl) awardNameEl.textContent = entry.name || cfg.toName || 'you';
    if (awardMsgEl) awardMsgEl.textContent = entry.message || '';
    if (awardEyebrowEl) awardEyebrowEl.textContent = awardEntries.length > 1 ? `${awardIndex + 1} / ${awardEntries.length}` : '';
    if (awardDotsEl) {
      awardDotsEl.innerHTML = '';
      awardEntries.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === awardIndex) dot.className = 'active';
        awardDotsEl.appendChild(dot);
      });
    }
  }
  renderAward();

  if (awardPrevBtn) awardPrevBtn.addEventListener('click', () => {
    awardIndex = (awardIndex - 1 + awardEntries.length) % awardEntries.length;
    renderAward();
  });
  if (awardNextBtn) awardNextBtn.addEventListener('click', () => {
    awardIndex = (awardIndex + 1) % awardEntries.length;
    renderAward();
  });

  // ---------------- Surprise → Finale ----------------
  const surpriseBtn = document.getElementById('surpriseBtn');
  const finaleTitleEl = document.getElementById('finaleTitle');
  const finaleMsgEl = document.getElementById('finaleMsg');
  const confettiLayer = document.getElementById('confettiLayer');

  if (finaleTitleEl) finaleTitleEl.textContent = cfg.surprise?.finaleTitle || 'I love you <3';
  if (finaleMsgEl) finaleMsgEl.textContent = cfg.surprise?.finaleMessage || '';

  function launchConfetti() {
    if (!confettiLayer) return;
    const pieces = ['💗', '🌷', '✨', '💌', '🎀'];
    confettiLayer.innerHTML = '';
    for (let i = 0; i < 34; i++) {
      const span = document.createElement('span');
      span.className = 'confetti-piece';
      span.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.animationDuration = 2.4 + Math.random() * 2 + 's';
      span.style.animationDelay = Math.random() * 0.6 + 's';
      confettiLayer.appendChild(span);
    }
  }

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      showScreen('finale');
      launchConfetti();
    });
  }
})();