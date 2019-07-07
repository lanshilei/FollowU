# FollowU

## 1. 关于开发
项目使用Taro框架进行开发，进行开发前需要确保电脑已经安装Taro小程序运行所需要的环境依赖，具体的安装步骤参考[Taro安装及使用](https://nervjs.github.io/taro/docs/GETTING-STARTED.html)。

### 1.1 项目结构
项目中的目录结构安排:
```
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── images             资源图片
|   ├── components         公共组件目录
|   ├── pages              页面文件目录
|   |   ├── xxx            xxx 页面目录
|   |   |   ├── xxx.js     xxx 页面逻辑
|   |   |   └── xxx.css    xxx 页面样式
|   ├── utils              公共方法库
|   ├── app.css            项目总通用样式
|   └── app.js             项目入口文件
└── package.json
```

### 1.2 书写规范
书写规范遵从[Taro书写规范](https://nervjs.github.io/taro/docs/spec-for-taro.html)即可

## 2. 编译及预览
开发完成后，需要在项目目录下执行以下命令进行编译:
```
# npm
$ npm run build:weapp

# 或者 yarn
yarn build:weapp
```

编译完成后，会在项目目录下自动生成`dist`目录，之后使用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)导入`dist`目录， 然后就可以在微信开发者工具里面进行预览或者真机预览。
