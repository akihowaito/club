# OK绷电竞 · 万圣扭蛋机

正式地址：https://okbeng-halloween.akihowaito.cn/（后台 /admin.html）

这里是 GitHub Pages 备用地址，已连接正式后台，和正式地址共用同一份数据。

备用地址：https://akihowaito.github.io/club/okbeng-halloween/
后台：https://akihowaito.github.io/club/okbeng-halloween/admin.html

本目录是构建产物（代码已混淆并限定域名运行），源码不在此仓库。

## 切换预览 / 正式

只需要改 `runtime.js`，不用重新构建：

- 预览：`window.OKB_RUNTIME = { mode: 'demo', api: '' }` —— 不连后端，数据只存在当前浏览器，凭证带「预览」水印，后台密码 okbeng2026。
- 正式：`window.OKB_RUNTIME = { mode: 'live', api: 'https://你的后端域名' }` —— 后端需把本页来源 https://akihowaito.github.io 加入 OKB_CORS_ORIGINS。

如果页面直接由后端服务托管（推荐，国内访问更稳），后端会自动下发正式配置，本目录只作备用。

## 更新后手机上还是旧版？

微信等 App 会把页面缓存很久。页面每次打开都会读 `version.json` 核对版本，旧了会自动刷新到新版；
如果手机上缓存的是加入这个功能之前的旧页面，在链接后面加 `?v=任意数字` 打开一次即可（例：`…/okbeng-halloween/?v=1028`）。
