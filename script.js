const siteContent = {
  name: "Eylül",
  date: "22 Temmuz 2026",
  song: {
    title: "О моей любви",
    youtubeVideoId: "35SDwiprnqc",
    volume: 18
  },
  roseLines: [
    "Bazı insanlar bir mevsim gibi gelir.",
    "Sen geldiğinden beri benim en güzel mevsimim hep Eylül.",
    "Sana gerçek bir gül verebilirdim.",
    "Ben sana solmayacak bir tane bırakmak istedim."
  ],
  acrostic: [
    { letter: "E", text: "En güzel tesadüfüm oldun." },
    { letter: "Y", text: "Yanımda olduğunda dünya biraz daha sessiz, biraz daha güzel." },
    { letter: "L", text: "Lafını ettiğim bütün yarınlarda bir şekilde sen varsın." },
    { letter: "Ü", text: "Üzerinden kaç yıl geçerse geçsin sana aynı heyecanla bakmak istiyorum." },
    { letter: "L", text: "Layık olduğun bütün güzelliklerin seni bulmasını diliyorum." }
  ],
  facts: [
    "Gülüşü gereğinden fazla güzel.",
    "Bazen dünyanın en tatlı, bazen en sinir bozucu insanı.",
    "Bir yaş daha büyüdü ama nedense bir yaş daha güzel oldu.",
    "İnsanların aklını karıştırma konusunda doğal yetenekli.",
    "Benim bütün ciddi planlarımı tek gülüşle bozabiliyor.",
    "Bugün resmen daha da sevilmesi gereken biri."
  ],
  loveReasons: [
    "Gülüşünün bütün sinirimi geçirebilmesi.",
    "Sesini duyduğumda günümün bir anda değişmesi.",
    "Bazen beni sinir edip birkaç saniye sonra yine kendine güldürmen.",
    "Yanımda olmasan bile günümün içinde hep bir yerinin olması.",
    "Seni anlatmaya çalıştığımda kelimelerin hep yetersiz kalması."
  ],
  flirtyMessages: {
    first: [
      "Buraya seni ne kadar güzel bulduğumu yazacaktım.",
      "Kelime sınırına takıldım."
    ]
  },
  ageDifference: {
    me: { age: 18, label: "BEN" },
    eylul: { age: 22, label: "EYLÜL" },
    gap: "4 yıl",
    lines: [
      "Takvim aramızda dört yıl olduğunu söylüyor.",
      "Ben ise seni bulmakta dört yıl geç kaldığımı düşünüyorum."
    ],
    final: "İyi ki benden önce geldin, Eylül."
  },
  letter: [
    "Sana güzel bir doğum günü mesajı yazabilirdim. Birkaç cümle kurup sana gönderebilirdim. Ama sen benim için birkaç cümleye sığacak biri değilsin.",
    "Hayatıma girdiğinden beri bazı günler daha güzel, bazı şarkılar daha anlamlı ve bazı hayaller daha gerçek geliyor.",
    "Seni yalnızca mutlu olduğumuz anlarda değil; sinirlendiğinde, sustuğunda, yorulduğunda ve kendini güzel hissetmediğinde de seviyorum.",
    "Bugün senin doğum günün. Ama seni tanımış olmak, sanki bana verilmiş bir hediye gibi geliyor.",
    "İyi ki doğdun, benim en güzel mevsimim.",
    "İyi ki varsın.",
    "İyi ki hayatımda Eylül var."
  ]
};

(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = (id) => document.getElementById(id);
  const story = byId("story");
  let started = false;
  let player = null;
  let playerReady = false;
  let playing = false;
  let manuallyPaused = false;

  function fillContent() {
    document.querySelectorAll("[data-name]").forEach((node) => { node.textContent = siteContent.name; });
    document.querySelectorAll("[data-name-initial]").forEach((node) => { node.textContent = siteContent.name.charAt(0); });
    document.querySelectorAll("[data-date]").forEach((node) => { node.textContent = siteContent.date; });
    document.querySelector("[data-song-title]").textContent = siteContent.song.title;

    document.querySelector("[data-rose-lines]").replaceChildren(...siteContent.roseLines.map((line) => {
      const p = document.createElement("p"); p.textContent = line; return p;
    }));

    document.querySelector("[data-acrostic]").replaceChildren(...siteContent.acrostic.map((item) => {
      const article = document.createElement("article"); article.className = "letter-panel observed";
      const letter = document.createElement("span"); letter.className = "giant-letter"; letter.textContent = item.letter;
      const text = document.createElement("p"); text.textContent = item.text;
      article.append(letter, text); return article;
    }));

    document.querySelector("[data-facts]").replaceChildren(...siteContent.facts.map((fact) => {
      const article = document.createElement("article"); article.className = "fact-card observed";
      const p = document.createElement("p"); p.textContent = fact; article.appendChild(p); return article;
    }));

    document.querySelector("[data-reasons]").replaceChildren(...siteContent.loveReasons.map((reason, index) => {
      const article = document.createElement("article"); article.className = "reason-card observed";
      const number = document.createElement("span"); number.textContent = String(index + 1).padStart(2, "0");
      const p = document.createElement("p"); p.textContent = reason;
      const star = document.createElement("i"); star.textContent = "✦";
      article.append(number, p, star); return article;
    }));

    const first = document.querySelector("[data-flirty-one]");
    const firstMain = document.createElement("p"); firstMain.textContent = siteContent.flirtyMessages.first[0];
    const firstAside = document.createElement("span"); firstAside.textContent = siteContent.flirtyMessages.first[1];
    first.append(firstMain, firstAside);

    document.querySelector("[data-age-me]").textContent = siteContent.ageDifference.me.age;
    document.querySelector(".age-person--me span").textContent = siteContent.ageDifference.me.label;
    document.querySelector("[data-age-eylul]").textContent = siteContent.ageDifference.eylul.age;
    document.querySelector(".age-person--eylul span").textContent = siteContent.ageDifference.eylul.label;
    document.querySelector("[data-age-gap]").textContent = siteContent.ageDifference.gap;
    document.querySelector("[data-age-line-one]").textContent = siteContent.ageDifference.lines[0];
    document.querySelector("[data-age-line-two]").textContent = siteContent.ageDifference.lines[1];
    document.querySelector("[data-age-final]").textContent = siteContent.ageDifference.final;

    const letter = document.querySelector("[data-letter]");
    siteContent.letter.forEach((text, index) => {
      const p = document.createElement("p"); p.textContent = text;
      if (index >= 4) p.className = "emphasis";
      letter.appendChild(p);
    });
  }

  function createPlayer() {
    if (!started || player || !window.YT || !window.YT.Player) return;
    try {
      player = new window.YT.Player("youtubePlayer", {
        width: "1", height: "1", videoId: siteContent.song.youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1,
          rel: 0,
          disablekb: 1,
          loop: 1,
          playlist: "35SDwiprnqc"
        },
        events: {
          onReady: function () {
            playerReady = true;
            try { player.setVolume(siteContent.song.volume); manuallyPaused = false; player.playVideo(); } catch (_) { /* Site müziksiz de çalışır. */ }
          },
          onStateChange: function (event) {
            playing = event.data === window.YT.PlayerState.PLAYING;
            if (event.data === window.YT.PlayerState.PAUSED) manuallyPaused = true;
            if (event.data === window.YT.PlayerState.ENDED && !manuallyPaused) {
              try { player.playVideo(); } catch (_) { /* Loop başarısız olsa da site çalışır. */ }
            }
            updateMusicControl();
          },
          onError: function () { playerReady = false; updateMusicControl(); }
        }
      });
    } catch (_) { player = null; }
  }

  window.onYouTubeIframeAPIReady = createPlayer;

  function updateMusicControl() {
    const control = byId("musicControl");
    control.classList.toggle("is-paused", !playing);
    control.querySelector(".music-state").textContent = playing ? "Ⅱ" : "▶";
    control.setAttribute("aria-label", playing ? "Müziği durdur" : "Müziği devam ettir");
  }

  function beginStory() {
    if (started) return;
    started = true;
    document.body.classList.remove("locked");
    byId("opening").classList.add("is-gone");
    story.classList.add("is-started");
    story.setAttribute("aria-hidden", "false");
    byId("musicControl").classList.remove("is-hidden");
    const roseObject = document.querySelector(".rose-art");
    roseObject.data = roseObject.dataset.src;
    document.querySelector(".rose-section").classList.add("is-drawing");
    createPlayer();
    window.setTimeout(() => byId("gul").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), reducedMotion ? 0 : 650);
    document.querySelectorAll(".rose-copy p").forEach((line, index) => {
      window.setTimeout(() => line.classList.add("is-visible"), reducedMotion ? 0 : 3300 + index * 550);
    });
  }

  byId("startButton").addEventListener("click", beginStory);
  byId("musicControl").addEventListener("click", function () {
    if (!playerReady || !player) return;
    try {
      if (playing) { manuallyPaused = true; player.pauseVideo(); }
      else { manuallyPaused = false; player.playVideo(); }
    } catch (_) { /* Sessiz devam et. */ }
  });
  document.querySelector(".rose-button").addEventListener("click", () => byId("akrostis").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }));

  function setupCanvas() {
    const canvas = byId("flowerCanvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;
    let previous = null;
    let steps = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * ratio); canvas.height = Math.round(rect.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    function point(event) { const rect = canvas.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; }
    function start(event) { drawing = true; previous = point(event); canvas.setPointerCapture(event.pointerId); }
    function draw(event) {
      if (!drawing || !previous) return;
      const current = point(event);
      ctx.save(); ctx.shadowColor = "rgba(238,191,108,.8)"; ctx.shadowBlur = 10; ctx.strokeStyle = "rgba(244,211,151,.9)"; ctx.lineWidth = 1.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(previous.x, previous.y); ctx.quadraticCurveTo(previous.x, previous.y, current.x, current.y); ctx.stroke();
      steps += 1;
      if (steps % 28 === 0) {
        ctx.translate(current.x, current.y); ctx.fillStyle = "rgba(154,57,70,.8)";
        for (let i = 0; i < 5; i += 1) { ctx.rotate(Math.PI * 2 / 5); ctx.beginPath(); ctx.ellipse(0, -6, 2.4, 6, 0, 0, Math.PI * 2); ctx.fill(); }
        ctx.fillStyle = "#e9bd69"; ctx.beginPath(); ctx.arc(0, 0, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore(); previous = current;
      if (steps > 130) byId("drawResult").hidden = false;
    }
    function end() { drawing = false; previous = null; }
    canvas.addEventListener("pointerdown", start); canvas.addEventListener("pointermove", draw); canvas.addEventListener("pointerup", end); canvas.addEventListener("pointercancel", end);
    window.addEventListener("resize", resize, { passive: true }); resize();
    byId("clearCanvas").addEventListener("click", function () { ctx.clearRect(0, 0, canvas.width, canvas.height); steps = 0; byId("drawResult").hidden = true; });
    byId("completeCanvas").addEventListener("click", function () { byId("drawResult").hidden = false; });
  }

  function blowCandle() {
    byId("candleMoment").hidden = true;
    byId("birthdayReveal").hidden = false;
    byId("dilek").classList.add("is-blown");
    const count = reducedMotion ? 8 : ((navigator.deviceMemory || 4) <= 2 ? 18 : 32);
    const holder = byId("particles");
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("i");
      particle.className = "particle " + (i % 3 === 1 ? "leaf" : i % 3 === 2 ? "star" : "");
      particle.style.setProperty("--x", (((i * 47) % 260) - 130) + "px");
      particle.style.setProperty("--y", (-70 - ((i * 37) % 230)) + "px");
      particle.style.setProperty("--r", ((i * 73) % 360) + "deg");
      particle.style.animationDelay = ((i % 7) * .04) + "s";
      holder.appendChild(particle);
      particle.addEventListener("animationend", () => particle.remove(), { once: true });
    }
  }
  byId("candle").addEventListener("click", blowCandle, { once: true });

  byId("envelope").addEventListener("click", function () {
    const scene = byId("envelopeScene");
    scene.classList.add("is-open"); this.setAttribute("aria-expanded", "true");
    window.setTimeout(() => { byId("letterPaper").hidden = false; byId("letterPaper").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" }); }, reducedMotion ? 0 : 700);
  }, { once: true });

  function setupObservers() {
    const targets = document.querySelectorAll(".observed,.reveal,.age-stage");
    if (reducedMotion || !("IntersectionObserver" in window)) { targets.forEach((node) => node.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .3 });
    targets.forEach((node) => observer.observe(node));
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.querySelector(".progress i").style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  fillContent(); setupCanvas(); setupObservers(); updateProgress();
}());
