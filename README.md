# 「静夜聆雨」管理后台

## 描述

这是网站「静夜聆雨」的后台管理系统项目，基于 [Ant Design Pro](https://pro.ant.design) 开发

## 项目设置

### 环境要求

- Node.js >= 12

**安装依赖**

```bash
pnpm i
```

### 编译和运行项目

```bash
pnpm start
```

### 构建项目

```bash
pnpm build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### 注意

1. `services` 中的 `API` 接口由后端提供的 `swagger`文档自动生成,（使用 `pnpm openapi` 命令）。请不要更改其中的文件，否则会在下次生成接口时被覆盖。
