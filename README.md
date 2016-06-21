## 项目架构

### 整体架构

* UI层：`react`

* 路由：`react-router-redux`

* 业务层：`redux`

### 目录结构

> 以下只列出目录以及重要文件

```
.
├── src
|   ├── pages: 页面级代码
|   ├── redux: 业务层代码
|   ├── index.js: 项目根节点
|   └── routes.js: 路由
├── output-template: index.html和css什么的备份文件夹
├── index.js: 入口文件
├── webpack.config.js: 开发版本的webpack配置文件
└── webpack.production.config.js: 部署版本的webpack配置文件
```

## 运行

> 需要先全局安装`$ npm install webpack webpack-dev-server react-tools`

```
$ npm install
$ npm run dev
```

浏览器里打开`http://localhost:8081`