const FALLBACK_WORKS = [
  {
    group: "LP制作",
    title: "YUKI YOGA",
    category: "ヨガインストラクター",
    description: "LP制作",
    image: "assets/images/work-yuki-yoga.png",
    alt: "YUKI YOGAのLP制作実績",
    url: "https://lp-studio02.github.io/yuki-yoga-slow-living-for-life/"
  },
  {
    group: "LP制作",
    title: "あゆみのまほう",
    category: "カラーセラピー・四柱推命",
    description: "LP制作・ロゴ制作・名刺・印鑑デザイン制作",
    image: "assets/images/work-ayumi-mahou.png",
    alt: "あゆみのまほうのLP制作、ロゴ制作、名刺、印鑑デザイン制作実績",
    url: "https://www.ayumi-mahou.com/"
  },
  {
    group: "LP制作",
    title: "メイサさん",
    category: "SNSアカウント用のLP",
    description: "LP制作",
    image: "assets/images/work-meisa.jpg",
    alt: "メイサさんのSNSアカウント用LP制作実績",
    url: "https://meisa-world.vercel.app/"
  },
  {
    group: "ロゴ・名刺制作",
    title: "あゆみのまほう",
    category: "ロゴ制作",
    description: "カラーセラピー・四柱推命",
    image: "assets/images/work-ayumi-logo-new.png",
    alt: "あゆみのまほうのロゴ制作実績"
  },
  {
    group: "ロゴ・名刺制作",
    title: "あゆみのまほう",
    category: "名刺制作",
    description: "名刺デザイン 表面・裏面",
    images: [
      {
        src: "assets/images/work-ayumi-card-front-full.png",
        alt: "あゆみのまほうの名刺表面デザイン"
      },
      {
        src: "assets/images/work-ayumi-card-back-fullname.png",
        alt: "あゆみのまほうの名刺裏面デザイン"
      }
    ]
  },
  {
    group: "ロゴ・名刺制作",
    title: "あゆのさん",
    category: "ロゴ制作",
    description: "アロマフレグランスアドバイザー",
    image: "assets/images/work-ayuno-logo.png",
    alt: "あゆのさんのアロマフレグランスアドバイザー向けロゴ制作実績"
  },
  {
    group: "ロゴ・名刺制作",
    title: "あゆのさん",
    category: "名刺制作",
    description: "名刺デザイン 表面・裏面",
    images: [
      {
        src: "assets/images/work-ayuno-card-front.png",
        alt: "あゆのさんの名刺表面デザイン"
      },
      {
        src: "assets/images/work-ayuno-card-back.png",
        alt: "あゆのさんの名刺裏面デザイン"
      }
    ]
  }
];

const worksList = document.querySelector("#works-list");

function renderWorkCard(work, isClone = false) {
  const imageMarkup = Array.isArray(work.images) && work.images.length
    ? `
      <div class="work-card__image work-card__image--stack">
        ${work.images.map((image) => `<img src="${image.src}" alt="${isClone ? "" : image.alt}" loading="lazy" width="800" height="450">`).join("")}
      </div>
    `
    : `
      <div class="work-card__image">
        <img src="${work.image}" alt="${isClone ? "" : work.alt}" loading="lazy" width="800" height="600">
      </div>
    `;

  return `
    <article class="work-card reveal${isClone ? " work-card--clone" : ""}"${isClone ? ' aria-hidden="true"' : ""}>
      ${imageMarkup}
      <div class="work-card__body">
        <p class="work-card__category">${work.category}</p>
        <h3>${work.title}</h3>
        <p class="work-card__meta">${work.description}</p>
        ${work.url ? `<a class="work-card__link" href="${work.url}" target="_blank" rel="noopener noreferrer"${isClone ? ' tabindex="-1"' : ""}>サイトを見る <span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </article>
  `;
}

function renderWorks(works) {
  const groups = ["LP制作", "ロゴ・名刺制作"];
  worksList.innerHTML = groups.map((group) => {
    const groupWorks = works.filter((work) => (work.group || "LP制作") === group);
    if (!groupWorks.length) return "";
    const marqueeWorks = [...groupWorks, ...groupWorks];
    return `
      <section class="works-row reveal" aria-label="${group}">
        <div class="works-row__heading">
          <p class="works-row__label">${group}</p>
          <button class="works-row__arrow" type="button" aria-label="${group}の実績を右へスクロール">→</button>
        </div>
        <div class="works-track works-grid--marquee">
          ${marqueeWorks.map((work, index) => renderWorkCard(work, index >= groupWorks.length)).join("")}
        </div>
      </section>
    `;
  }).join("");
  setupWorksArrows();
  observeReveals();
}

function setupWorksArrows() {
  document.querySelectorAll(".works-row__arrow").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest(".works-row");
      const card = row?.querySelector(".work-card:not(.work-card--clone)");
      if (!row || !card) return;
      const gap = parseFloat(getComputedStyle(row.querySelector(".works-track")).gap) || 0;
      row.scrollBy({ left: card.getBoundingClientRect().width + gap, behavior: "smooth" });
    });
  });
}

async function loadWorks() {
  try {
    const response = await fetch("works.json", { cache: "no-store" });
    if (!response.ok) throw new Error("works.json could not be loaded");
    const works = await response.json();
    renderWorks(works);
  } catch (error) {
    renderWorks(FALLBACK_WORKS);
  }
}

let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((item) => revealObserver.observe(item));
}

const menuButton = document.querySelector(".menu-button");
const globalNav = document.querySelector(".global-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  globalNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

globalNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    globalNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

observeReveals();
loadWorks();
