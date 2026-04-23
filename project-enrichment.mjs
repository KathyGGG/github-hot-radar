const PROJECT_OVERRIDES = {
  "codecrafters-io/build-your-own-x": {
    descriptionZh: "通过从零复刻经典技术栈来学习编程原理，适合做系统化动手训练。",
    categoryLabel: "开发学习",
  },
  "sindresorhus/awesome": {
    descriptionZh: "收集各类主题优质资源列表的经典仓库，是开源世界的导航入口。",
    categoryLabel: "资源导航",
  },
  "freeCodeCamp/freeCodeCamp": {
    descriptionZh: "免费学习编程、数学与计算机科学的开源课程与平台代码库。",
    categoryLabel: "开发学习",
  },
  "public-apis/public-apis": {
    descriptionZh: "免费 API 汇总目录，适合找接口、做原型和副项目。",
    categoryLabel: "开发工具",
  },
  "EbookFoundation/free-programming-books": {
    descriptionZh: "免费编程书籍总目录，覆盖多语言与技术方向。",
    categoryLabel: "开发学习",
  },
  "openclaw/openclaw": {
    descriptionZh: "跨平台个人 AI 助手项目，强调本地化控制与任务执行能力。",
    categoryLabel: "AI Agent",
  },
  "kamranahmedse/developer-roadmap": {
    descriptionZh: "开发者成长路线图，帮助前后端、DevOps、AI 等方向系统进阶。",
    categoryLabel: "开发学习",
  },
  "donnemartin/system-design-primer": {
    descriptionZh: "系统设计入门与面试准备经典仓库，包含大规模系统设计资料。",
    categoryLabel: "系统设计",
  },
  "jwasham/coding-interview-university": {
    descriptionZh: "面向软件工程师的完整计算机科学自学路线图。",
    categoryLabel: "开发学习",
  },
  "vinta/awesome-python": {
    descriptionZh: "Python 框架、库、工具与学习资源的精选列表。",
    categoryLabel: "Python",
  },
  "awesome-selfhosted/awesome-selfhosted": {
    descriptionZh: "自托管软件和网络服务大全，适合搭建个人或团队基础设施。",
    categoryLabel: "自托管",
  },
  "996icu/996.ICU": {
    descriptionZh: "围绕 996 工作制讨论的标志性仓库，带有强烈社区议题属性。",
    categoryLabel: "社区议题",
  },
  "kyegomez/OpenMythos": {
    descriptionZh: "从公开研究资料中重建 Claude Mythos 架构思路的理论项目。",
    categoryLabel: "AI",
  },
  "browser-use/browser-harness": {
    descriptionZh: "面向大模型的自愈式浏览器执行框架，用于完成复杂网页任务。",
    categoryLabel: "AI Agent",
  },
  "alchaincyf/huashu-design": {
    descriptionZh: "面向 Claude Code 的 HTML 原生设计技能包，适合原型、幻灯片和动效生成。",
    categoryLabel: "设计工具",
  },
  "yizhiyanhua-ai/fireworks-tech-graph": {
    descriptionZh: "为 AI 与 Agent 场景生成高质量技术图表的技能工具。",
    categoryLabel: "AI",
  },
  "Robbyant/lingbot-map": {
    descriptionZh: "面向流式数据场景的 3D 场景重建基础模型。",
    categoryLabel: "具身智能",
  },
  "getagentseal/codeburn": {
    descriptionZh: "可视化追踪 AI 编码工具 token 成本的终端仪表盘。",
    categoryLabel: "AI 工具",
  },
  "browser-use/video-use": {
    descriptionZh: "browser-use 体系下的视频任务执行项目，聚焦多模态浏览器能力。",
    categoryLabel: "AI Agent",
  },
  "google-labs-code/design.md": {
    descriptionZh: "给智能体描述视觉规范与设计系统的结构化格式规范。",
    categoryLabel: "设计系统",
  },
  "tw93/Kami": {
    descriptionZh: "把优质内容整理成更适合阅读和打印的精美页面。",
    categoryLabel: "内容工具",
  },
  "TencentCloud/CubeSandbox": {
    descriptionZh: "为 AI Agent 提供即时、安全、轻量的沙箱执行环境。",
    categoryLabel: "AI 基础设施",
  },
  "vercel-labs/wterm": {
    descriptionZh: "运行在浏览器里的终端模拟器。",
    categoryLabel: "开发工具",
  },
  "QLHazyCoder/codex-oauth-automation-extension": {
    descriptionZh: "支持 OpenAI OAuth 自动化流程的 Chrome 扩展。",
    categoryLabel: "浏览器扩展",
  },
};

const OWNER_OVERRIDES = {
  alchaincyf: {
    displayNameZh: "阿链 CYF",
    bioZh: "中国开发者，关注设计工程、智能体工作流与 HTML 原生创作体验。",
    isFromChina: true,
  },
  "yizhiyanhua-ai": {
    displayNameZh: "一支烟花 AI",
    bioZh: "中国 AI 团队，专注智能体、可视化表达与技术图谱生成。",
    isFromChina: true,
  },
  tw93: {
    displayNameZh: "tw93",
    bioZh: "中国独立开发者，长期活跃于内容产品、浏览器工具与开源设计社区。",
    isFromChina: true,
  },
  TencentCloud: {
    displayNameZh: "腾讯云",
    bioZh: "中国云计算平台与开发者生态团队，持续投入 AI 基础设施与开发工具。",
    isFromChina: true,
  },
  QLHazyCoder: {
    displayNameZh: "QLHazyCoder",
    bioZh: "中国开发者，关注浏览器自动化、OAuth 工作流与效率工具。",
    isFromChina: true,
  },
};

const CHINA_HINTS = [
  "china",
  "beijing",
  "shanghai",
  "shenzhen",
  "hangzhou",
  "guangzhou",
  "chengdu",
  "wuhan",
  "hong kong",
  "中国",
  "北京",
  "上海",
  "深圳",
  "杭州",
  "广州",
  "成都",
  "武汉",
  "香港",
];

const CATEGORY_RULES = [
  { label: "具身智能", patterns: ["robot", "robotics", "scene", "3d", "reconstruct"] },
  { label: "AI Agent", patterns: ["agent", "browser", "assistant", "llm"] },
  { label: "AI", patterns: ["model", "ai", "mythos", "prompt", "embedding"] },
  { label: "设计工具", patterns: ["design", "prototype", "slide", "svg", "visual"] },
  { label: "开发工具", patterns: ["terminal", "dashboard", "api", "tool", "sandbox"] },
  { label: "浏览器扩展", patterns: ["chrome", "extension", "browser extension"] },
  { label: "系统设计", patterns: ["system design"] },
  { label: "Python", patterns: ["python"] },
  { label: "自托管", patterns: ["selfhost", "self-hosted"] },
  { label: "资源导航", patterns: ["awesome", "list", "resource"] },
  { label: "开发学习", patterns: ["learn", "study", "roadmap", "book", "course"] },
];

function containsChinese(text = "") {
  return /[\u3400-\u9fff]/.test(text);
}

function detectChina(location = "", bio = "", company = "") {
  const joined = `${location} ${bio} ${company}`.toLowerCase();
  return CHINA_HINTS.some((hint) => joined.includes(hint));
}

function inferCategory(project) {
  const override = PROJECT_OVERRIDES[project.fullName];
  if (override?.categoryLabel) {
    return override.categoryLabel;
  }

  const text = [
    project.fullName,
    project.description,
    project.language,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const matched = CATEGORY_RULES.find((rule) =>
    rule.patterns.some((pattern) => text.includes(pattern))
  );

  return matched?.label || "其他";
}

function translateDescription(project) {
  const override = PROJECT_OVERRIDES[project.fullName];
  if (override?.descriptionZh) {
    return override.descriptionZh;
  }

  if (!project.description) {
    return "暂无中文翻译。";
  }

  if (containsChinese(project.description)) {
    return project.description;
  }

  return `项目简介：${project.description}`;
}

function enrichOwnerProfile(project, ownerProfile = {}) {
  const override = OWNER_OVERRIDES[project.owner];
  const isFromChina = override?.isFromChina || detectChina(ownerProfile.location, ownerProfile.bio, ownerProfile.company);

  return {
    displayName: ownerProfile.name || project.owner,
    displayNameZh: override?.displayNameZh || ownerProfile.name || project.owner,
    bioZh: override?.bioZh || "",
    isFromChina,
    location: ownerProfile.location || "",
    blog: ownerProfile.blog || "",
  };
}

export function enrichProject(project, ownerProfile = {}) {
  return {
    ...project,
    descriptionZh: translateDescription(project),
    categoryLabel: inferCategory(project),
    ownerProfile: enrichOwnerProfile(project, ownerProfile),
  };
}
