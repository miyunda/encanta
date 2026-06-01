# encanta

`encanta` 是一个个人博客项目，采用“静态站点优先”的工作流。

## 项目目标

- 保持发布链路简单可靠，以静态渲染为主。
- 从 Git 管理的 Markdown 内容仓库渲染文章。
- 提供良好的阅读体验，包括自适应布局、浅色/深色主题、丰富的 Markdown 渲染能力和媒体播放支持。
- 项目本体以英语为主，同时为中文用户提供本说明文件。

## 工作纪律

- 严禁直接向 `main` 分支提交。
- 分支名称必须能够体现实际更改内容。
- 设计、实施、测试等环节必须在 `docs/` 中留痕。
- 长期规划维护在 [`docs/roadmap.md`](docs/roadmap.md)。
- 主文档使用英语，同时保留 [`README_CN.md`](README_CN.md) 为中文用户提供帮助。
- 如果后续文档规模明显扩大，可以再考虑引入 Wiki。

## 目录结构

```text
.
├── README.md
├── README_CN.md
├── encanta/
│   ├── assets/
│   ├── layouts/
│   ├── static/
│   ├── exampleSite/
│   └── theme.toml
├── docs/
│   ├── changes/
│   ├── project-rules.md
│   └── roadmap.md
└── .gitignore
```

## 文档约定

- `docs/roadmap.md`：长期规划与阶段目标
- `docs/project-rules.md`：协作规则、分支策略、文档要求
- `docs/changes/`：重要设计和实施工作的记录

## 当前状态

当前仓库已建立项目纪律基线，完成第一版站点架构设计说明，并生成了位于 `encanta/` 下的 Hugo 主题骨架。

## 计划中的分发方式

`encanta` 主题后续将以 Hugo Modules 作为首选安装方式，同时保留 Git Submodule 和手工复制两种次要方案。
