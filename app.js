const DATA_URL = "./projects.json";

const state = {
  payload: null,
  search: "",
  category: "all",
};

const topStarredList = document.querySelector("#topStarredList");
const risingList = document.querySelector("#risingList");
const spotlightGrid = document.querySelector("#spotlightGrid");
const generatedAt = document.querySelector("#generatedAt");
const refreshButton = document.querySelector("#refreshButton");
const searchInput = document.querySelector("#searchInput");
const categoryFilters = document.querySelector("#categoryFilters");
const summaryCount = document.querySelector("#summaryCount");
const summaryLanguage = document.querySelector("#summaryLanguage");
const summaryChinaOwners = document.querySelector("#summaryChinaOwners");
const summaryStars = document.querySelector("#summaryStars");
const topBoardCount = document.querySelector("#topBoardCount");
const risingBoardCount = document.querySelector("#risingBoardCount");
const projectTemplate = document.querySelector("#projectCardTemplate");
const spotlightTemplate = document.querySelector("#spotlightCardTemplate");

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const formatDate = (value) =>
  new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
  }).format(new Date(value));

const formatCount = (value) => new Intl.NumberFormat("zh-CN").format(value);

function renderMessage(target, className, message) {
  target.innerHTML = `<div class="${className}">${message}</div>`;
}

function getCombinedProjects(payload) {
  return [...(payload.topStarred ?? []), ...(payload.rising ?? [])];
}

function normalizeText(project) {
  return [
    project.fullName,
    project.owner,
    project.description,
    project.descriptionZh,
    project.language,
    project.categoryLabel,
    project.ownerProfile?.displayNameZh,
    project.ownerProfile?.bioZh,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function filterProjects(projects) {
  return projects.filter((project) => {
    const matchesSearch =
      !state.search || normalizeText(project).includes(state.search);
    const matchesCategory =
      state.category === "all" || project.categoryLabel === state.category;

    return matchesSearch && matchesCategory;
  });
}

function renderProjectCards(target, projects, typeLabel) {
  target.innerHTML = "";

  if (!projects.length) {
    renderMessage(target, "empty-state", "当前筛选条件下没有匹配项目。");
    return;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const node = projectTemplate.content.firstElementChild.cloneNode(true);
    const countryBadge = node.querySelector(".badge--country");
    const authorBlock = node.querySelector(".project-card__author");
    const ownerProfile = project.ownerProfile || {};

    node.querySelector(".project-card__avatar").src = project.ownerAvatarUrl;
    node.querySelector(".project-card__avatar").alt = `${project.owner} avatar`;
    node.querySelector(".project-card__repo").textContent = project.fullName;
    node.querySelector(".project-card__owner-name").textContent = `@${project.owner}`;
    node.querySelector(".project-card__rank").textContent = `${typeLabel} #${index + 1}`;
    node.querySelector(".badge--category").textContent = project.categoryLabel || "未分类";
    node.querySelector(".project-card__desc").textContent =
      project.description || "这个项目暂时没有提供英文描述。";
    node.querySelector(".project-card__desc-zh").textContent =
      project.descriptionZh || "暂无中文翻译。";
    node.querySelector(".stat-pill--star").textContent = `★ ${formatCount(project.stars)}`;
    node.querySelector(".stat-pill--fork").textContent = `Fork ${formatCount(project.forks)}`;
    node.querySelector(".stat-pill--lang").textContent = project.language || "Unknown";
    node.querySelector(".project-card__created").textContent = `创建于 ${formatDate(project.createdAt)}`;
    node.querySelector(".project-card__updated").textContent = `更新于 ${formatDate(project.updatedAt)}`;
    node.querySelector(".project-card__link").href = project.url;

    if (ownerProfile.isFromChina) {
      countryBadge.hidden = false;
      countryBadge.textContent = "中国作者";
      authorBlock.hidden = false;
      node.querySelector(".project-card__author-name").textContent =
        ownerProfile.displayNameZh || ownerProfile.displayName || project.owner;
      node.querySelector(".project-card__author-bio").textContent =
        ownerProfile.bioZh || "来自中国开发者社区，更多背景资料待补充。";
    }

    fragment.appendChild(node);
  });

  target.appendChild(fragment);
}

function renderSpotlights(topStarred, rising) {
  spotlightGrid.innerHTML = "";
  const picks = [
    { project: topStarred[0], label: "最高星级" },
    { project: rising[0], label: "最新热点" },
  ].filter((item) => item.project);

  if (!picks.length) {
    renderMessage(spotlightGrid, "empty-state", "焦点项目暂时不可用。");
    return;
  }

  const fragment = document.createDocumentFragment();

  picks.forEach(({ project, label }) => {
    const node = spotlightTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".spotlight-card__type").textContent = `${label} · ${project.categoryLabel || "未分类"}`;
    node.querySelector(".spotlight-card__title").textContent = project.fullName;
    node.querySelector(".spotlight-card__desc").textContent =
      project.description || "这个项目暂时没有提供英文描述。";
    node.querySelector(".spotlight-card__desc-zh").textContent =
      project.descriptionZh || "暂无中文翻译。";
    node.querySelector(".spotlight-card__link").href = project.url;
    node.querySelector(".spotlight-card__stats").innerHTML = [
      `★ ${formatCount(project.stars)}`,
      `Fork ${formatCount(project.forks)}`,
      project.language || "Unknown",
    ]
      .map((text) => `<span class="stat-pill">${text}</span>`)
      .join("");
    fragment.appendChild(node);
  });

  spotlightGrid.appendChild(fragment);
}

function renderCategoryFilters(payload) {
  const categories = Array.from(
    new Set(
      getCombinedProjects(payload)
        .map((project) => project.categoryLabel || "未分类")
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "zh-CN"));

  const options = ["all", ...categories];

  categoryFilters.innerHTML = options
    .map((category) => {
      const label = category === "all" ? "全部" : category;
      const active = state.category === category ? " chip--active" : "";
      return `<button class="chip${active}" type="button" data-category="${category}">${label}</button>`;
    })
    .join("");
}

function renderSummary(payload) {
  const combined = getCombinedProjects(payload);
  const languageCount = new Map();
  const chinaOwners = combined.filter((project) => project.ownerProfile?.isFromChina).length;

  combined.forEach((project) => {
    const language = project.language || "Unknown";
    languageCount.set(language, (languageCount.get(language) || 0) + 1);
  });

  const hottestLanguage =
    [...languageCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "--";
  const maxStars = combined.reduce(
    (max, project) => Math.max(max, project.stars || 0),
    0
  );

  summaryCount.textContent = String(combined.length);
  summaryLanguage.textContent = hottestLanguage;
  summaryChinaOwners.textContent = String(chinaOwners);
  summaryStars.textContent = formatCount(maxStars);
}

function renderBoards() {
  if (!state.payload) {
    return;
  }

  const filteredTop = filterProjects(state.payload.topStarred ?? []);
  const filteredRising = filterProjects(state.payload.rising ?? []);

  topBoardCount.textContent = `${filteredTop.length} 个结果`;
  risingBoardCount.textContent = `${filteredRising.length} 个结果`;

  renderProjectCards(topStarredList, filteredTop, "TOP");
  renderProjectCards(risingList, filteredRising, "NEW");
  renderSpotlights(filteredTop, filteredRising);
}

async function loadData() {
  renderMessage(topStarredList, "loading", "正在加载最高星级项目...");
  renderMessage(risingList, "loading", "正在加载最新热点项目...");
  renderMessage(spotlightGrid, "loading", "正在准备今日焦点...");

  try {
    const response = await fetch(`${DATA_URL}?t=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    state.payload = await response.json();
    generatedAt.textContent = `最近更新：${formatDateTime(state.payload.generatedAt)}`;

    renderSummary(state.payload);
    renderCategoryFilters(state.payload);
    renderBoards();
  } catch (error) {
    generatedAt.textContent = "数据加载失败";
    renderMessage(
      topStarredList,
      "error-state",
      "暂时无法读取榜单数据，请确认已运行每日更新脚本或已部署自动任务。"
    );
    renderMessage(risingList, "error-state", `读取失败：${error.message}`);
    renderMessage(spotlightGrid, "error-state", "今日焦点暂时不可用。");
  }
}

refreshButton.addEventListener("click", () => {
  loadData();
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim().toLowerCase();
  renderBoards();
});

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) {
    return;
  }

  state.category = button.dataset.category;
  renderCategoryFilters(state.payload);
  renderBoards();
});

loadData();
