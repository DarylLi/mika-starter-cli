# Mika FE Frameworks CLI

一个简单易用的前端项目脚手架工具，支持快速创建 React、Vue、Next.js、Nuxt、Nest 等多种项目模板。

##  特性

- 支持多种主流框架模板
- 快速初始化项目
- 友好的命令行交互界面
- 模板搜索功能
- 自动配置 package.json
- 基于最新的构建工具

## 安装

### 全局安装（推荐）

```bash
npm install -g mika-cli
```

### 本地使用

```bash
npx mika-cli init <template> <project-name>
```

## 支持的模板

| 模板名称 | 说明 | 适用场景 |
|---------|------|---------|
| `mika-webpack` | React + Webpack | React 项目开发 |
| `mika-rspack` | React + Rspack | 高性能 React 项目 |
| `mika-ssr` | Vue3 SSR | Vue 服务端渲染 |
| `vue` | Vue3 官方脚手架 | Vue3 项目开发 |
| `nuxt` | Nuxt3 全栈框架 | Vue 全栈应用 |
| `next` | Next.js React 框架 | React 全栈应用 |
| `nest` | NestJS 后端框架 | Node.js 后端服务 |
| `rsbuild` | Rsbuild 构建工具 | 现代化构建方案 |
| `esbuild` | ESBuild 快速构建 | 极速构建方案 |

##  快速开始

### 1. 查看所有可用模板

```bash
mika list
```

输出示例：
```
可用模板列表：

1. mika            │ React + Webpack 模板
2. mika-rspack     │ React + Rspack 模板
3. vue             │ Vue3 官方脚手架模板
4. next            │ Next.js React 全栈框架模板
...
```

### 2. 创建新项目

```bash
mika init <template> <project-name>
```

示例：
```bash
# 创建 Vue 项目
mika init vue my-vue-app

# 创建 Next.js 项目
mika init next my-next-app

# 创建 Nest.js 后端项目
mika init nest my-api-server
```

### 3. 搜索模板

```bash
mika search <keyword>
```

示例：
```bash
# 搜索包含 "react" 的模板
mika search react

# 搜索包含 "vue" 的模板
mika search vue
```

## 使用流程

1. **选择模板并创建项目**
   ```bash
   mika init vue my-project
   ```

2. **按提示输入项目信息**
   - 项目名称（默认为你输入的项目名）
   - 项目描述
   - 作者名称
   - 版本号

3. **等待下载完成**

4. **进入项目并安装依赖**
   ```bash
   cd my-project
   npm install
   npm run dev
   ```

## 命令说明

### `mika init <template> <project-name>`

初始化一个新项目

- `<template>`: 模板名称（必填）
- `<project-name>`: 项目名称（必填）

**示例：**
```bash
mika init vue my-vue-project
```

### `mika list`

查看所有可用的项目模板

**示例：**
```bash
mika list
```

### `mika search <keyword>`

搜索包含关键词的模板

**示例：**
```bash
mika search react
mika search ssr
```

### `mika --version` 或 `mika -v`

查看当前 CLI 版本

### `mika --help` 或 `mika -h`

查看帮助信息

## 配置说明

项目下载后，CLI 会自动根据你的输入配置 `package.json` 文件：

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "your project description",
  "author": "your name"
}
```

## 使用示例

### 创建 React 项目
```bash
mika init mika my-react-app
cd my-react-app
npm install
npm run dev
```

### 创建 Vue3 项目
```bash
mika init vue my-vue-app
cd my-vue-app
npm install
npm run dev
```

### 创建 Next.js 全栈应用
```bash
mika init next my-next-app
cd my-next-app
npm install
npm run dev
```

### 创建 Nest.js 后端服务
```bash
mika init nest my-api
cd my-api
npm install
npm run start:dev
```


## 作者

DarylLi

## 致谢

感谢所有为这个项目做出贡献的开发者！

---


如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！


