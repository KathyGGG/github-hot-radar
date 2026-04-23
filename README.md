# GitHub 热点雷达

一个更像产品首页的 GitHub 热门项目发现站，聚合两类榜单：

- 最高星级项目
- 最近 14 天内新出现并快速升温的热点项目

## 在线功能

- 产品化首页布局
- 搜索项目、作者、描述
- 按语言筛选
- 今日焦点与摘要指标
- 每天自动刷新 `data/projects.json`

## 数据来源

站点数据来自 GitHub Search API，生成脚本位于 `scripts/update-data.mjs`。

## 自动更新

- `.github/workflows/daily-update.yml` 会每天抓取最新数据
- 生成后的 JSON 会自动提交回仓库
- GitHub Pages 部署后，页面会随着数据更新而自动刷新

## 本地预览

更新数据：

```powershell
& "C:\Users\kathy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts/update-data.mjs
```

启动预览：

```powershell
& "C:\Users\kathy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts/serve.mjs
```

打开 `http://localhost:4173`。
