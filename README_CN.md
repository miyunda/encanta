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
├── assets/
├── layouts/
├── exampleSite/
├── theme.toml
├── hugo.toml.example
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

当前仓库已建立项目纪律基线，完成第一版站点架构设计说明，并在仓库根目录形成了 Hugo 主题骨架。

## 导航菜单配置

头部导航自带四个默认项：

- `posts` -> `Articles`
- `tags` -> `Tags`
- `categories` -> `Categories`
- `about` -> `About`

你不需要在 `hugo.toml` 里重复声明它们。`[menu.main]` 只需要用于两种场景：

- 添加额外链接，例如站外“哔哔”页面
- 通过相同 `identifier` 覆盖默认项的名称、链接或顺序

例如：

```toml
[menu]
  [[menu.main]]
    identifier = "bb"
    name = "哔哔"
    url = "https://bb.miyunda.com/"
    weight = 5

  [[menu.main]]
    identifier = "posts"
    name = "文章"
    url = "/posts/"
    weight = 10
```

## 计划中的分发方式

`encanta` 主题后续将以 Hugo Modules 作为首选安装方式，同时保留 Git Submodule 和手工复制两种次要方案。

## Module 更新流程

如果站点通过 Hugo Modules 安装 `encanta`，那么仅仅把改动合并到 `encanta/main`，并不会让站点在下一次部署时自动使用新主题。使用方站点会继续使用自己 `go.mod` 和 `go.sum` 中锁定的主题版本，除非它显式更新依赖。

推荐流程如下：

1. 先把主题改动合并到 `encanta/main`。
2. 在使用该主题的站点仓库中执行：

```bash
hugo mod get -u github.com/miyunda/encanta
```

3. 检查并提交 `go.mod` 与 `go.sum` 的变更。
4. 等这些变更进入站点的生产分支后，再触发部署。

这种版本锁定是有意为之。它可以保证站点构建可复现，也能避免未明确升级的主题改动直接进入生产环境。
