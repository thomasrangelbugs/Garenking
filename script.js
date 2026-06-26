const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const scrollProgress = document.getElementById("scrollProgress");
const heroBg = document.getElementById("heroBg");
const heroParticles = document.getElementById("heroParticles");

const GAREN_SKINS = [
  { num: 0, name: "Garen clássico", chromas: true },
  { num: 1, name: "Garen Sanguinário", chromas: false },
  { num: 2, name: "Garen Legião do Deserto", chromas: false },
  { num: 3, name: "Patrulheiro Garen", chromas: false },
  { num: 4, name: "Garen Cavaleiro do Terror", chromas: false },
  { num: 5, name: "Garen Errante", chromas: false },
  { num: 6, name: "Garen Legionário de Aço", chromas: false },
  { num: 10, name: "Garen Almirante Fugitivo", chromas: false },
  { num: 11, name: "Garen Reinos Combatentes", chromas: true },
  { num: 13, name: "Deus-Rei Garen", chromas: false },
  { num: 14, name: "Garen Demacia Vice", chromas: true },
  { num: 22, name: "Garen Reinos Mech", chromas: false },
  { num: 23, name: "Garen Reinos Mech de Prestígio", chromas: false },
  { num: 24, name: "Garen Academia de Batalha", chromas: true },
  { num: 33, name: "Garen Criador Mítico", chromas: true },
  { num: 43, name: "Garen Pingu", chromas: false },
  { num: 44, name: "Deus-Rei Garen Caído", chromas: false },
  { num: 46, name: "Garen Visões dos Caídos", chromas: true },
];

const GAREN_STATS = {
  patch: "26.12",
  patchMinor: "16.12.1",
  updated: "24/06/2026",
  lane: "Top",
  tier: "S",
  winRate: 51.4,
  pickRate: 8.4,
  banRate: 5.4,
  buildWinRate: 54.0,
  matches: "213k+",
};

const DDRAGON = "https://ddragon.leagueoflegends.com/cdn/16.12.1/img/champion";
const CHAMP_FALLBACK = `${DDRAGON}/Garen.png`;

function championIcon(id) {
  return `${DDRAGON}/${id}.png`;
}

const GAREN_MATCHUPS = [
  { id: "KSante", name: "K'Sante", wr: 64.1, tier: "easy", tip: "Aproveite o começo fraco dele e pressione a wave. Depois do 6, evite lutar perto de parede e use Ignite no all-in." },
  { id: "Darius", name: "Darius", wr: 56.4, tier: "easy", tip: "O dado favorece Garen, mas a lane pune erro. Faça trades curtos com Q+E, recue antes da passiva dele fechar 5 stacks e nunca aceite luta longa sem vantagem." },
  { id: "Yasuo", name: "Yasuo", wr: 58.0, tier: "easy", tip: "Quebre o escudo com um toque curto antes do all-in. Guarde Q para silenciar depois da mobilidade dele e não conte com Q para negar tornado." },
  { id: "Jax", name: "Jax", wr: 56.9, tier: "easy", tip: "Force o Contra-Ataque antes do all-in. Enquanto o E dele estiver ativo, recue; depois volte com Q, E e Ignite." },
  { id: "Riven", name: "Riven", wr: 54.8, tier: "easy", tip: "Puna quando ela gastar Q para farmar ou se aproximar. Use W no controle de grupo ou no burst principal do combo." },
  { id: "Nasus", name: "Nasus", wr: 54.2, tier: "easy", tip: "Congele perto da sua torre, negue stacks e chame dive cedo. Depois do 6, finalize com R antes que a ultimate vire a troca." },
  { id: "Poppy", name: "Poppy", wr: 54.0, tier: "easy", tip: "Evite trocar colado em parede por causa do stun. Quando o W ou o E dela estiverem em CD, Garen consegue vencer trades curtos." },
  { id: "MasterYi", name: "Master Yi", wr: 55.5, tier: "easy", tip: "Guarde Q para interromper a Meditação ou impedir a sequência dele. Use Ignite cedo e evite desperdiçar o R durante o Alfa." },
  { id: "Gwen", name: "Gwen", wr: 55.0, tier: "easy", tip: "Troque curto antes de ela acumular Q. Se ela usar Névoa Sagrada, recue ou puxe a luta para fora da área." },
  { id: "Mordekaiser", name: "Mordekaiser", wr: 53.5, tier: "easy", tip: "Desvie do Q isolado com o movimento do seu Q. Não aceite ultimate dele sem vida, Ignite ou vantagem clara." },
  { id: "Shen", name: "Shen", wr: 53.2, tier: "easy", tip: "Empurre a wave e puna cada uso de ultimate com placa, torre ou proxy seguro. Cuidado para não trocar dentro do W dele." },
  { id: "Volibear", name: "Volibear", wr: 53.0, tier: "easy", tip: "Use W para absorver o stun e o burst inicial. Depois recue, deixe a marca do W dele cair e volte para uma troca curta." },
  { id: "MonkeyKing", name: "Wukong", wr: 52.8, tier: "easy", tip: "Não gaste Q ou R no clone. Espere ele revelar a posição real e use W quando ele entrar com ultimate." },
  { id: "Renekton", name: "Renekton", wr: 52.5, tier: "easy", tip: "Respeite a barra de fúria cheia e jogue por trades curtos. Depois de Quebrapassos, Garen passa a controlar melhor a distância." },
  { id: "Olaf", name: "Olaf", wr: 52.3, tier: "easy", tip: "Use Q para remover o slow do machado e kite enquanto a ultimate dele estiver ativa. Lutas longas favorecem Olaf." },
  { id: "Pantheon", name: "Pantheon", wr: 52.1, tier: "easy", tip: "Use W para reduzir o combo de stun e recue do E dele. Depois do nível 6, sua pressão de side tende a ser maior." },
  { id: "Sion", name: "Sion", wr: 52.0, tier: "easy", tip: "Use o movimento do Q para sair do carregamento do Q dele. Depois do primeiro item, pressione side e evite ficar parado na frente da passiva." },
  { id: "Sett", name: "Sett", wr: 50.7, tier: "even", tip: "Troque curto, recue antes do W carregado e não lute parado no centro da habilidade. Use a passiva para recuperar entre trades." },
  { id: "Gangplank", name: "Gangplank", wr: 50.8, tier: "even", tip: "Congele perto da sua torre e force quando ele errar barril ou estiver sem laranja. Não caminhe em linha reta para barris preparados." },
  { id: "Gnar", name: "Gnar", wr: 50.7, tier: "even", tip: "Na forma mini, preserve vida e farme com paciência. Procure all-in quando ele gastar pulo ou entrar em Mega sem barra para estender a troca." },
  { id: "Teemo", name: "Teemo", wr: 50.1, tier: "even", tip: "Botas da Rapidez e Fase Acelerada ajudam muito. Entre depois do Cegar ou use Q para remover slow de cogumelo durante a perseguição." },
  { id: "Aatrox", name: "Aatrox", wr: 48.8, tier: "even", tip: "Desvie das bordas dos Qs e puna quando ele errar o terceiro Q. Ignite reduz a cura no all-in, mas não lute parado dentro da ultimate." },
  { id: "Malphite", name: "Malphite", wr: 50.2, tier: "even", tip: "Não precisa correr para corta-cura. Pressione antes de ele acumular muita armadura e use W para reduzir o engage da ultimate." },
  { id: "Ornn", name: "Ornn", wr: 50.0, tier: "even", tip: "Troque curto depois que ele gastar W ou E. Evite paredes e pilares, porque o controle dele vira a luta rapidamente." },
  { id: "Warwick", name: "Warwick", wr: 50.3, tier: "even", tip: "Ignite é essencial para reduzir a cura. Não estenda trocas com pouca vida, porque a passiva dele vira o duelo." },
  { id: "Chogath", name: "Cho'Gath", wr: 50.1, tier: "even", tip: "Desvie do Q e não fique previsível ao farmar. Depois de Quebrapassos, jogue side e force trocas antes de ele acumular muita vida." },
  { id: "Gragas", name: "Gragas", wr: 49.8, tier: "even", tip: "Entre quando o E dele estiver em CD. Se ele guardar o barril para disengage, empurre wave e ganhe pressão sem forçar abate." },
  { id: "Kennen", name: "Kennen", wr: 49.5, tier: "even", tip: "Fase Acelerada e botas cedo reduzem o poke. Force quando ele gastar E, mas guarde W para a ultimate." },
  { id: "Rumble", name: "Rumble", wr: 49.4, tier: "even", tip: "Saia do lança-chamas e não lute dentro da Equalizadora. O melhor all-in vem antes do nível 6 ou quando ele superaquece mal." },
  { id: "Yorick", name: "Yorick", wr: 49.2, tier: "even", tip: "Limpe carniçais com E e ataque a parede rapidamente se ficar preso. Evite lutar contra Donzela, wave grande e Ignite indisponível." },
  { id: "Illaoi", name: "Illaoi", wr: 49.0, tier: "even", tip: "Desvie do E e jogue fora da zona de tentáculos. Se ela ultar com espírito ou tentáculos ativos, recue e reinicie a luta." },
  { id: "Urgot", name: "Urgot", wr: 51.0, tier: "even", tip: "Use W quando ele ativar o combo de E ou W. Evite ser virado pelo E e finalize antes da execução da ultimate." },
  { id: "Maokai", name: "Maokai", wr: 49.6, tier: "even", tip: "Evite arbustos com mudas e troque depois que ele gastar Q. Corta-cura é situacional; pressão de side costuma valer mais." },
  { id: "Singed", name: "Singed", wr: 49.3, tier: "even", tip: "Não persiga pelo veneno. Congele a wave quando possível e pingue o jungler se ele tentar proxy cedo." },
  { id: "Swain", name: "Swain", wr: 49.1, tier: "even", tip: "Fase Acelerada ajuda a encurtar distância. Desvie do E; se ele acertar a raiz, recue antes do pull virar all-in." },
  { id: "Yone", name: "Yone", wr: 49.1, tier: "even", tip: "Puna quando o E dele terminar ou quando Q3 estiver em CD. O silêncio atrapalha a sequência, mas não cancele a alma já ativada." },
  { id: "Ambessa", name: "Ambessa", wr: 49.8, tier: "even", tip: "Respeite o burst do nível 3 e não gaste tudo enquanto ela ainda tem deslocamentos. Jogue por wave até Quebrapassos." },
  { id: "Zaahen", name: "Zaahen", wr: 49.5, tier: "even", tip: "Faça trades curtos e recue antes da resposta completa. Use W no principal controle ou burst e evite lutar sem informação dos cooldowns." },
  { id: "Fiora", name: "Fiora", wr: 51.2, tier: "even", tip: "Não entregue Q ou R de graça no Ripostar. Jogue com wave controlada, esconda vitais ruins e prefira teamfights quando a lane estiver estável." },
  { id: "Aurora", name: "Aurora", wr: 48.5, tier: "hard", tip: "Fase Acelerada e botas cedo são importantes. Force quando ela gastar mobilidade ou ultimate; se ela kitear livre, a troca fica ruim." },
  { id: "Irelia", name: "Irelia", wr: 48.2, tier: "hard", tip: "Não lute em wave cheia de minions baixos. Congele, reduza os resets do Q dela e use W no stun ou no all-in." },
  { id: "Jayce", name: "Jayce", wr: 47.8, tier: "hard", tip: "Compre botas cedo e preserve vida até ter alcance de all-in. Force quando ele errar o combo de aceleração ou trocar para martelo sem disengage." },
  { id: "Vladimir", name: "Vladimir", wr: 47.5, tier: "hard", tip: "Procure all-in no nível 6 com Ignite e não deixe ele escalar livre. Lembrete Mortal cedo ajuda se ele estiver conseguindo sustentar a lane." },
  { id: "Heimerdinger", name: "Heimerdinger", wr: 47.2, tier: "hard", tip: "Fase Acelerada e paciência. Limpe torres quando for seguro e só entre se o E dele estiver fora ou se o jungler estiver junto." },
  { id: "TahmKench", name: "Tahm Kench", wr: 47.2, tier: "hard", tip: "Respeite o começo forte e evite trocar depois de acumular marcas. Jogue por farm, side e corta-cura se ele ficar muito tanque." },
  { id: "Camille", name: "Camille", wr: 46.9, tier: "hard", tip: "Use W no impacto do Hookshot ou no Q2. Evite parede quando ela tiver E e não lute se o escudo passivo dela favorecer a troca." },
  { id: "Quinn", name: "Quinn", wr: 46.0, tier: "hard", tip: "Botas da Rapidez com Fase Acelerada. Não force sem Flash, jungler ou erro do E dela; sobreviver ao poke já é parte do plano." },
  { id: "Tryndamere", name: "Tryndamere", wr: 46.5, tier: "hard", tip: "Troque curto e saia antes de ele acumular fúria. Guarde recursos para depois da ultimate; Ignite durante o R raramente finaliza sozinho." },
  { id: "Kayle", name: "Kayle", wr: 43.3, tier: "hard", tip: "Puna muito dos níveis 1 a 5 e congele para negar XP. Se ela chegar estável ao 11, a lane passa a exigir pressão com equipe." },
  { id: "Vayne", name: "Vayne", wr: 47.0, tier: "hard", tip: "Fase Acelerada e Botas da Rapidez são prioridade. Entre apenas quando ela errar Condenar ou gastar Rolamento de forma agressiva." },
  { id: "DrMundo", name: "Dr. Mundo", wr: 51.5, tier: "even", tip: "Quebre a passiva dele antes de gastar controle importante. Lembrete Mortal cedo é bom se ele sustentar demais; caso contrário, priorize pressão de side." },
  { id: "Galio", name: "Galio", wr: 50.5, tier: "even", tip: "Depois do 6, puna as rotações dele com wave e torre. Use W no taunt ou no engage e cuidado com resposta do jungler." },
  { id: "Ryze", name: "Ryze", wr: 48.8, tier: "even", tip: "Preserve vida nos primeiros níveis e procure all-in com Flash ou Quebrapassos. Se ele controlar a wave livremente, escala melhor." },
  { id: "Akali", name: "Akali", wr: 48.0, tier: "hard", tip: "Fase Acelerada ajuda a acompanhar. Force quando ela gastar E ou fumaça; usar R enquanto ela ainda pode sumir costuma desperdiçar execução." },
  { id: "Lissandra", name: "Lissandra", wr: 48.3, tier: "hard", tip: "Use Q para remover slows e encurtar distância, mas respeite a raiz. Entre depois que ela gastar E ou ultimate defensiva." },
];

const GAREN_PLAYERS = [
  {
    name: "palcopaint",
    rank: "Grandmaster",
    region: "EUW",
    role: "Garen OTP",
    platform: "Twitch",
    url: "https://www.twitch.tv/palcopaint",
    note: "~88% Garen · pico de 2105 LP na temporada 16.",
  },
  {
    name: "ReiDoRetorno",
    rank: "Challenger",
    region: "BR",
    role: "Mono Garen",
    platform: "Twitch",
    url: "https://www.twitch.tv/reidoretorno",
    note: "100% Garen em soloQ · conta Ghost Samurai.",
  },
  {
    name: "erislash",
    rank: "Challenger",
    region: "EUW",
    role: "Garen OTP",
    platform: "Twitch",
    url: "https://www.twitch.tv/erislash",
    note: "Pico de 1104 LP · histórico quase só Garen.",
  },
  {
    name: "Trcoci",
    rank: "Master",
    region: "EUW",
    role: "Garen OTP",
    platform: "Twitch / YouTube",
    url: "https://www.twitch.tv/trcoci",
    note: "~93% Garen · 1500+ LP · 590+ jogos na conta.",
  },
  {
    name: "Triton",
    rank: "Grandmaster",
    region: "NA",
    role: "Garen OTP",
    platform: "Twitch",
    url: "https://www.twitch.tv/triton",
    note: "~95% Garen · pico de 801 LP · guia no Patreon.",
  },
  {
    name: "PetitBoogie",
    rank: "Master",
    region: "EUW",
    role: "Garen OTP",
    platform: "Twitch",
    url: "https://www.twitch.tv/petitboogie",
    note: "~96% Garen · OTP francês focado em soloQ.",
  },
  {
    name: "Yshuro13",
    rank: "Master",
    region: "EUW",
    role: "Garen OTP",
    platform: "YouTube",
    url: "https://www.youtube.com/@yshuro13",
    note: "~96% Garen · conteúdo educacional em alto elo.",
  },
];

function initMenu() {
  if (!menuToggle || !siteNav) return;

  const closeMenu = () => {
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("open");
    body.classList.remove("no-scroll");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    siteNav.classList.toggle("open", isOpen);
    body.classList.toggle("no-scroll", isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });
}

function initScrollProgress() {
  if (!scrollProgress) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    scrollProgress.style.width = `${value}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.13 }
  );

  items.forEach((item) => observer.observe(item));
}

function initParallax() {
  if (!heroBg) return;

  const update = () => {
    const y = Math.max(0, window.scrollY);
    heroBg.style.transform = `scale(1.06) translateY(${y * 0.08}px)`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initParticles() {
  if (!heroParticles) return;

  const count = 34;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.setProperty("--x", `${Math.random() * 100}%`);
    dot.style.setProperty("--size", `${2 + Math.random() * 4}px`);
    dot.style.setProperty("--dur", `${8 + Math.random() * 8}s`);
    dot.style.setProperty("--delay", `${Math.random() * 8}s`);
    fragment.appendChild(dot);
  }

  heroParticles.appendChild(fragment);
}

function initTiltCards() {
  const cards = document.querySelectorAll(".tilt-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 960) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 4;
      const rotateX = ((centerY - y) / centerY) * 4;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const fragment = document.createDocumentFragment();

  GAREN_SKINS.forEach((skin) => {
    const button = document.createElement("button");
    const src = `assets/images/garen_${skin.num}.jpg`;

    button.className = "gallery-item reveal";
    button.type = "button";
    button.setAttribute("data-full", src);
    button.innerHTML = `
      <img src="${src}" alt="${skin.name}" loading="lazy">
      <span class="skin-label">
        <strong>${skin.name}</strong>
        ${skin.chromas ? "<small>Possui cromas</small>" : "<small>Skin principal</small>"}
      </span>
    `;

    fragment.appendChild(button);
  });

  gallery.replaceChildren(fragment);
}

function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  if (!galleryItems.length || !lightbox || !lightboxImage || !lightboxClose) return;

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-full");
      const image = item.querySelector("img");
      if (!src || !image) return;

      lightboxImage.src = src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightboxClose.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function decodeText(input = "") {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  return doc.documentElement.textContent || "";
}

function extractSource(title = "") {
  const parts = title.split(" - ");
  if (parts.length > 1) return parts[parts.length - 1].trim();
  return "Fonte não identificada";
}

function formatDate(raw) {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "Data indisponível";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function renderNews(items, list, status) {
  list.innerHTML = "";

  if (!items.length) {
    list.innerHTML = `
      <article class="news-empty">
        Nenhuma notícia encontrada agora. Tente atualizar em alguns minutos.
      </article>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const title = decodeText(item.title || "Sem título");
    const source = decodeText(item.author || extractSource(title));
    const card = document.createElement("article");
    card.className = "news-card reveal in-view";

    card.innerHTML = `
      <h3><a href="${item.link}" target="_blank" rel="noopener noreferrer">${title}</a></h3>
      <div class="news-meta">
        <span>${source}</span>
        <span>${formatDate(item.pubDate)}</span>
      </div>
      <p class="news-excerpt">${decodeText(item.description || "Clique para abrir a matéria completa.").replace(/\s+/g, " ").slice(0, 220)}...</p>
    `;

    fragment.appendChild(card);
  });

  list.appendChild(fragment);
  status.textContent = `Atualizado em ${new Intl.DateTimeFormat("pt-BR", { timeStyle: "medium" }).format(new Date())}`;
}

function initNews() {
  const list = document.getElementById("newsList");
  const status = document.getElementById("newsStatus");
  const refreshButton = document.getElementById("refreshNews");

  if (!list || !status || !refreshButton) return;

  const rss = "https://news.google.com/rss/search?q=%22Garen%22+%22League+of+Legends%22+OR+%22LoL%22&hl=pt-BR&gl=BR&ceid=BR:pt-419";
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;

  const fetchNewsJsonp = () =>
    new Promise((resolve, reject) => {
      const callbackName = `newsCallback_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => {
        cleanup();
        reject(new Error("Timeout ao carregar feed por JSONP."));
      }, 12000);

      const cleanup = () => {
        window.clearTimeout(timeout);
        if (script.parentNode) script.parentNode.removeChild(script);
        delete window[callbackName];
      };

      window[callbackName] = (payload) => {
        cleanup();
        resolve(payload);
      };

      script.onerror = () => {
        cleanup();
        reject(new Error("Falha ao injetar script JSONP."));
      };

      script.src = `${endpoint}&callback=${callbackName}`;
      document.head.appendChild(script);
    });

  const fetchNews = async () => {
    status.textContent = "Buscando notícias em tempo real...";

    try {
      const data = await fetchNewsJsonp();
      if (data.status !== "ok") {
        throw new Error(data.message || "Erro ao processar feed.");
      }

      const items = (data.items || [])
        .filter((item) => /garen|league of legends|lol/i.test(`${item.title || ""} ${item.description || ""}`))
        .slice(0, 8);
      renderNews(items, list, status);
    } catch (error) {
      list.innerHTML = `
        <article class="news-empty">
          Não foi possível carregar o feed agora.<br>
          <a href="${rss}" target="_blank" rel="noopener noreferrer">Abrir notícias direto no Google News</a>
        </article>
      `;
      status.textContent = "Erro ao carregar notícias.";
      console.error(error);
    }
  };

  refreshButton.addEventListener("click", fetchNews);
  fetchNews();
  setInterval(fetchNews, 15 * 60 * 1000);
}

function initIntroGate() {
  const gate = document.getElementById("introGate");
  const sword = document.getElementById("sword");
  const track = document.getElementById("swordTrack");
  const impactParticles = document.getElementById("impactParticles");
  const energyNova = document.getElementById("energyNova");
  const swordEnergyField = document.getElementById("swordEnergyField");
  const swordIdleSparks = document.getElementById("swordIdleSparks");

  if (!gate || !sword || !track || !impactParticles) return;

  const KEY = "garenGateOpenedV2";
  const searchParams = new URLSearchParams(window.location.search);
  const forcedSkip = searchParams.get("skip_intro") === "1";

  if (forcedSkip) {
    sessionStorage.setItem(KEY, "1");
  }

  const alreadyOpened = sessionStorage.getItem(KEY) === "1";

  if (alreadyOpened) {
    gate.remove();
    return;
  }

  body.classList.add("no-scroll");

  const spawnIdleEnergy = () => {
    if (swordEnergyField) {
      const moteCount = 18;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < moteCount; i += 1) {
        const mote = document.createElement("span");
        const size = 3 + Math.random() * 5;
        mote.className = "energy-mote";
        mote.style.setProperty("--dur", `${2.8 + Math.random() * 3.2}s`);
        mote.style.setProperty("--delay", `${Math.random() * 3}s`);
        mote.style.width = `${size}px`;
        mote.style.height = `${size}px`;
        mote.style.left = `${38 + Math.random() * 24}%`;
        mote.style.top = `${52 + Math.random() * 28}%`;
        fragment.appendChild(mote);
      }

      swordEnergyField.replaceChildren(fragment);
    }

    if (swordIdleSparks) {
      const sparkCount = 10;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < sparkCount; i += 1) {
        const spark = document.createElement("span");
        spark.className = "sword-spark";
        spark.style.setProperty("--dur", `${1.4 + Math.random() * 2}s`);
        spark.style.setProperty("--delay", `${Math.random() * 2.5}s`);
        spark.style.left = `${10 + Math.random() * 80}%`;
        spark.style.top = `${20 + Math.random() * 60}%`;
        fragment.appendChild(spark);
      }

      swordIdleSparks.replaceChildren(fragment);
    }
  };

  spawnIdleEnergy();

  let dragging = false;
  let startY = 0;
  let currentY = 0;
  let opened = false;
  let audioCtx = null;
  let maxDrag = 0;
  let triggerPoint = 0;
  const BASE_ROTATION = 180;

  const recomputeDragLimits = () => {
    maxDrag = Math.max(96, track.clientHeight - sword.clientHeight + 90);
    triggerPoint = maxDrag * 0.82;
    setSwordY(currentY);
  };

  const setSwordY = (value) => {
    currentY = Math.max(0, Math.min(maxDrag, value));
    const tilt = Math.min(7, currentY / 18);
    sword.style.transform = `translateX(-50%) translateY(${currentY}px) rotate(${BASE_ROTATION + tilt}deg)`;
  };

  recomputeDragLimits();

  const playImpactAudio = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;

    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const now = audioCtx.currentTime;

    const hitOsc = audioCtx.createOscillator();
    const hitGain = audioCtx.createGain();
    hitOsc.type = "triangle";
    hitOsc.frequency.setValueAtTime(130, now);
    hitOsc.frequency.exponentialRampToValueAtTime(52, now + 0.22);
    hitGain.gain.setValueAtTime(0.001, now);
    hitGain.gain.exponentialRampToValueAtTime(0.26, now + 0.02);
    hitGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    hitOsc.connect(hitGain).connect(audioCtx.destination);
    hitOsc.start(now);
    hitOsc.stop(now + 0.3);

    const sparkleOsc = audioCtx.createOscillator();
    const sparkleGain = audioCtx.createGain();
    sparkleOsc.type = "sine";
    sparkleOsc.frequency.setValueAtTime(880, now + 0.04);
    sparkleOsc.frequency.exponentialRampToValueAtTime(220, now + 0.28);
    sparkleGain.gain.setValueAtTime(0.001, now + 0.03);
    sparkleGain.gain.exponentialRampToValueAtTime(0.16, now + 0.06);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    sparkleOsc.connect(sparkleGain).connect(audioCtx.destination);
    sparkleOsc.start(now + 0.03);
    sparkleOsc.stop(now + 0.38);

    const energyOsc = audioCtx.createOscillator();
    const energyGain = audioCtx.createGain();
    energyOsc.type = "sine";
    energyOsc.frequency.setValueAtTime(240, now + 0.05);
    energyOsc.frequency.exponentialRampToValueAtTime(90, now + 0.45);
    energyGain.gain.setValueAtTime(0.001, now + 0.04);
    energyGain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
    energyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    energyOsc.connect(energyGain).connect(audioCtx.destination);
    energyOsc.start(now + 0.04);
    energyOsc.stop(now + 0.52);
  };

  const spawnEnergyNova = () => {
    if (!energyNova) return;
    energyNova.innerHTML = "";

    for (let i = 0; i < 5; i += 1) {
      const ring = document.createElement("span");
      ring.className = "energy-nova-ring";
      ring.style.setProperty("--delay", `${i * 0.07}s`);
      energyNova.appendChild(ring);
    }

    const core = document.createElement("span");
    core.className = "impact-glow-core";
    impactParticles.appendChild(core);
  };

  const spawnImpactParticles = () => {
    impactParticles.innerHTML = "";
    const total = 72;

    for (let i = 0; i < total; i += 1) {
      const shard = document.createElement("span");
      const angle = (Math.PI * 2 * i) / total + (Math.random() - 0.5) * 0.55;
      const distance = 110 + Math.random() * 320;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance * 0.72 - 40;
      const width = 2 + Math.random() * 5;
      const height = 14 + Math.random() * 28;
      const delay = Math.random() * 0.1;
      const rot = `${120 + Math.random() * 420}deg`;

      shard.className = "impact-shard";
      shard.style.setProperty("--x", `${x.toFixed(2)}px`);
      shard.style.setProperty("--y", `${y.toFixed(2)}px`);
      shard.style.setProperty("--w", `${width.toFixed(2)}px`);
      shard.style.setProperty("--h", `${height.toFixed(2)}px`);
      shard.style.setProperty("--delay", `${delay.toFixed(3)}s`);
      shard.style.setProperty("--rot", rot);
      impactParticles.appendChild(shard);
    }

    for (let i = 0; i < 14; i += 1) {
      const bolt = document.createElement("span");
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (55 + Math.random() * 280);
      const y = -80 - Math.random() * 200;
      const rot = side * (18 + Math.random() * 28);

      bolt.className = "impact-bolt";
      bolt.style.setProperty("--x", `${x.toFixed(2)}px`);
      bolt.style.setProperty("--y", `${y.toFixed(2)}px`);
      bolt.style.setProperty("--rot", `${rot.toFixed(2)}deg`);
      bolt.style.setProperty("--delay", `${(Math.random() * 0.14).toFixed(3)}s`);
      impactParticles.appendChild(bolt);
    }

    spawnEnergyNova();
  };

  const openGate = () => {
    if (opened) return;
    opened = true;
    setSwordY(maxDrag);
    sword.classList.add("stabbed");

    if (navigator.vibrate) navigator.vibrate([80, 50, 120]);
    spawnImpactParticles();
    gate.classList.add("impact");
    if (swordEnergyField) swordEnergyField.style.opacity = "0";
    playImpactAudio();

    window.setTimeout(() => {
      gate.classList.add("opened");
      sessionStorage.setItem(KEY, "1");
      body.classList.remove("no-scroll");
      window.setTimeout(() => gate.remove(), 850);
    }, 150);
  };

  const handleDown = (event) => {
    if (opened) return;
    dragging = true;
    startY = event.clientY - currentY;
    sword.setPointerCapture(event.pointerId);
  };

  const handleMove = (event) => {
    if (!dragging || opened) return;
    const next = event.clientY - startY;
    setSwordY(next);

    if (currentY >= triggerPoint) {
      dragging = false;
      openGate();
    }
  };

  const handleUp = (event) => {
    if (!dragging || opened) return;
    dragging = false;
    sword.releasePointerCapture(event.pointerId);

    if (currentY < triggerPoint) {
      sword.style.transition = "transform 0.35s ease";
      setSwordY(0);
      window.setTimeout(() => {
        sword.style.transition = "";
      }, 350);
    }
  };

  sword.addEventListener("pointerdown", handleDown);
  sword.addEventListener("pointermove", handleMove);
  sword.addEventListener("pointerup", handleUp);
  sword.addEventListener("pointercancel", handleUp);
  window.addEventListener("resize", recomputeDragLimits);

  sword.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGate();
    }
  });
}

function updatePatchLabels() {
  document.querySelectorAll("#heroPatch, #guidePatchTitle, #matchupPatch, #footerPatch").forEach((el) => {
    if (el) el.textContent = GAREN_STATS.patch;
  });
}

function initStats() {
  updatePatchLabels();

  const heroStats = document.getElementById("heroStats");
  const guideMeta = document.getElementById("guideMeta");

  if (heroStats) {
    heroStats.innerHTML = `
      <div class="stat-pill"><span class="stat-value">${GAREN_STATS.tier}</span><span class="stat-label">Tier</span></div>
      <div class="stat-pill"><span class="stat-value">${GAREN_STATS.winRate}%</span><span class="stat-label">WR</span></div>
      <div class="stat-pill"><span class="stat-value">${GAREN_STATS.pickRate}%</span><span class="stat-label">Pick</span></div>
      <div class="stat-pill"><span class="stat-value">${GAREN_STATS.banRate}%</span><span class="stat-label">Ban</span></div>
    `;
  }

  if (guideMeta) {
    guideMeta.innerHTML = `
      <div class="guide-stat"><strong>Patch</strong><span>${GAREN_STATS.patch} (${GAREN_STATS.patchMinor})</span></div>
      <div class="guide-stat"><strong>Lane</strong><span>${GAREN_STATS.lane}</span></div>
      <div class="guide-stat"><strong>Tier</strong><span>${GAREN_STATS.tier}</span></div>
      <div class="guide-stat"><strong>WR</strong><span>${GAREN_STATS.winRate}% Emerald+</span></div>
      <div class="guide-stat"><strong>Pick</strong><span>${GAREN_STATS.pickRate}%</span></div>
      <div class="guide-stat"><strong>Build WR</strong><span>${GAREN_STATS.buildWinRate}%</span></div>
      <div class="guide-stat"><strong>Partidas</strong><span>${GAREN_STATS.matches}</span></div>
    `;
  }
}

function observeReveal(items) {
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((item) => observer.observe(item));
}

function renderMatchups(filter = "all", query = "") {
  const grid = document.getElementById("matchupGrid");
  if (!grid) return;

  const normalized = query.trim().toLowerCase();
  const sorted = [...GAREN_MATCHUPS].sort((a, b) => b.wr - a.wr);
  const filtered = sorted.filter((m) => {
    const matchesFilter = filter === "all" || m.tier === filter;
    const matchesQuery = !normalized || m.name.toLowerCase().includes(normalized);
    return matchesFilter && matchesQuery;
  });

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = `<p class="matchup-empty">Nenhum matchup encontrado.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach((matchup, index) => {
    const card = document.createElement("article");
    card.className = `matchup-card reveal tier-${matchup.tier}`;
    card.style.setProperty("--delay", `${Math.min(index * 0.03, 0.45)}s`);
    card.innerHTML = `
      <div class="matchup-head">
        <img src="${championIcon(matchup.id)}" alt="" loading="lazy" width="40" height="40" onerror="this.onerror=null;this.src='${CHAMP_FALLBACK}'">
        <div>
          <h3>${matchup.name}</h3>
          <span class="matchup-wr">${matchup.wr}% WR</span>
        </div>
        <span class="matchup-tier">${matchup.tier === "easy" ? "Favorável" : matchup.tier === "even" ? "Neutro" : "Difícil"}</span>
      </div>
      <p>${matchup.tip}</p>
    `;
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
  observeReveal(grid.querySelectorAll(".reveal"));
}

function initMatchups() {
  const search = document.getElementById("matchupSearch");
  const filters = document.getElementById("matchupFilters");
  if (!search || !filters) return;

  let activeFilter = "all";

  const setFilter = (value) => {
    activeFilter = value;
    filters.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === value);
    });
    renderMatchups(activeFilter, search.value);
  };

  filters.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;
    setFilter(btn.dataset.filter);
  });

  search.addEventListener("input", () => {
    renderMatchups(activeFilter, search.value);
  });

  renderMatchups();
}

function initPlayers() {
  const grid = document.getElementById("playersGrid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  GAREN_PLAYERS.forEach((player, index) => {
    const card = document.createElement("a");
    card.className = "player-card reveal";
    card.href = player.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.style.setProperty("--delay", `${index * 0.05}s`);
    card.innerHTML = `
      <div class="player-top">
        <strong>${player.name}</strong>
        <span class="player-rank">${player.rank}</span>
      </div>
      <div class="player-meta">
        <span>${player.region}</span>
        <span>${player.role}</span>
        <span>${player.platform}</span>
      </div>
      <p>${player.note}</p>
    `;
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
  observeReveal(grid.querySelectorAll(".reveal"));
}

function initActiveNav() {
  const links = siteNav?.querySelectorAll("a[href^='#']");
  const sections = document.querySelectorAll("main section[id]");

  if (!links?.length || !sections.length) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (id) map.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = map.get(entry.target.id);
          active?.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

initMenu();
initScrollProgress();
initParallax();
initParticles();
initTiltCards();
initStats();
renderGallery();
initMatchups();
initPlayers();
initActiveNav();
initReveal();
initGallery();
initNews();
initIntroGate();
