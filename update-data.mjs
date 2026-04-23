import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { enrichProject } from "./project-enrichment.mjs";

const OUTPUT_PATH = resolve("data", "projects.json");
const API_URL = "https://api.github.com/search/repositories";
const PER_PAGE = 12;
const EMBODIED_PER_PAGE = 10;
const ownerCache = new Map();

function daysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function buildHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "github-hot-radar",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchRepositories(query, sort, perPage = PER_PAGE) {
  const url = new URL(API_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("sort", sort);
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API 请求失败: ${response.status} ${body}`);
  }

  const data = await response.json();
  return (data.items ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    fullName: item.full_name,
    owner: item.owner?.login ?? "unknown",
    ownerType: item.owner?.type ?? "User",
    ownerAvatarUrl: item.owner?.avatar_url ?? "",
    description: item.description ?? "",
    url: item.html_url,
    stars: item.stargazers_count,
    forks: item.forks_count,
    language: item.language,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}

async function fetchOwnerProfile(owner, ownerType = "User") {
  const cacheKey = `${ownerType}:${owner}`;
  if (ownerCache.has(cacheKey)) {
    return ownerCache.get(cacheKey);
  }

  const profileUrl = new URL(
    ownerType === "Organization"
      ? `https://api.github.com/orgs/${owner}`
      : `https://api.github.com/users/${owner}`
  );

  const response = await fetch(profileUrl, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    ownerCache.set(cacheKey, {});
    return {};
  }

  const data = await response.json();
  const profile = {
    name: data.name ?? "",
    bio: data.bio ?? "",
    location: data.location ?? "",
    blog: data.blog ?? "",
    company: data.company ?? "",
  };

  ownerCache.set(cacheKey, profile);
  return profile;
}

async function enrichRepositories(projects) {
  return Promise.all(
    projects.map(async (project) => {
      const ownerProfile = await fetchOwnerProfile(project.owner, project.ownerType);
      return enrichProject(project, ownerProfile);
    })
  );
}

async function main() {
  const rawTopStarred = await fetchRepositories(
    "stars:>50000 archived:false mirror:false",
    "stars"
  );
  const rawRising = await fetchRepositories(
    `created:>=${daysAgo(14)} stars:>50 archived:false mirror:false`,
    "stars"
  );
  const rawEmbodied = await fetchRepositories(
    "(robotics OR humanoid OR embodied) stars:>200 archived:false mirror:false",
    "stars",
    EMBODIED_PER_PAGE
  );

  const payload = {
    generatedAt: new Date().toISOString(),
    criteria: {
      topStarred: "stars:>50000 archived:false mirror:false",
      rising: `created:>=${daysAgo(14)} stars:>50 archived:false mirror:false`,
      embodiedTop:
        "(robotics OR humanoid OR embodied) stars:>200 archived:false mirror:false",
    },
    topStarred: await enrichRepositories(rawTopStarred),
    rising: await enrichRepositories(rawRising),
    embodiedTop: await enrichRepositories(rawEmbodied),
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`已写入 ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
