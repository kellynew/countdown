# Next.js 倒数日应用

本应用旨在用最简单的方法解决市面上大部分倒数日应用不能免费自定义颜色和背景图片的痛点。

本应用默认基于 SQLite 数据库，故无需额外配置即可开始使用。

## 快速启动

1. 安装依赖：

```bash
npm install
```

2. 创建SQLite数据库：

```bash
npx prisma migrate dev --name init
```

3. 启动开发服务器：

```bash
npm run dev
```

然后就可以访问 [http://localhost:3000](http://localhost:3000) 打开服务器了。

## 编译运行

先完成快速启动的前两步，再运行：

```bash
npm run build
npm start
```

然后就可以访问 [http://localhost:3000](http://localhost:3000) 打开服务器了。

## 基础二次开发指南

### 使用其他数据库

可以修改 `prisma/schema.prisma`，替换以下部分：

```js
datasource db {
  provider = "sqlite"
  url      = "file:./countdown.db"
}
```

比如可以替换为：

```js
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:your_password@localhost:5432/countdowns"
}
```

然后运行 `npx prisma migrate dev --name init` 初始化一下数据库就可以了。

### 使用其他端口

可以修改 `package.json`，替换以下部分：

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
}
```

比如替换为：

```json
"scripts": {
    "dev": "next dev -p 1212",
    "build": "next build",
    "start": "next start -p 1212",
    "lint": "next lint"
}
```

然后正常启动即可。如果使用上文配置，就需要访问 [http://localhost:1212](http://localhost:1212) 打开服务器了。

### 翻译

打开 `src` 修改每个 `tsx` 文件中的字符串即可。

### 为什么用 `Next.js`？

这个项目是我自学 React 框架时在 DeepSeek 的帮助下完成的，希望通过开源的方式给大家学习 React 提供参考。