# 顺宇电竞 · 中秋双节活动

适用版本：V12（手机端活动须知排版更新、国内图床外链版）。这是一个静态 HTML 互动活动页面，无需安装 React、Node.js 或执行构建命令。

## 文件说明

从 V12 GitHub 部署包解压后，仓库根目录应为：

```text
shunyu-midautumn/
├── index.html                  # 网页、样式与交互逻辑
├── bg_moonlight_poster.jpg     # 视频加载前及播放失败时的静态封面
└── README.MD                   # 本说明文件（可选）
```

页面的 LOGO、背景视频和背景音乐使用已经写入 `index.html` 的第三方 HTTPS 直链，不需要把这些原始素材再上传到 GitHub。`README_部署说明.txt` 如仍在原 ZIP 内，可以保留或删除。

## 通过 GitHub 网页部署

1. 登录 [GitHub](https://github.com/)，新建一个仓库，例如 `shunyu-midautumn`。已有仓库可直接使用，不要重复新建。
2. 解压 V12 部署包。进入仓库，选择 **Add file → Upload files**，上传 `index.html` 和 `bg_moonlight_poster.jpg`；此 `README.MD` 也可一并上传。**不要只上传 ZIP。**
3. 确保 `index.html` 位于仓库根目录，不要套入多余文件夹。点击 **Commit changes** 提交。
4. 进入仓库的 **Settings → Pages**，在 **Build and deployment** 中将 **Source** 设为 `Deploy from a branch`，分支选择 `main`，目录选择 `/ (root)`，点击 **Save**。
5. 等待部署完成后，在 **Settings → Pages** 点击 **Visit site**。通常页面地址格式为：

   ```text
   https://<GitHub用户名>.github.io/shunyu-midautumn/
   ```

   请将 `<GitHub用户名>` 替换为你自己的账户名。只有部署完成、仓库名称一致时，此示例地址才成立。

GitHub 官方文档：[配置 GitHub Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 后续更新

在原仓库中重新上传新版 `index.html`，必要时同时更新背景封面，再提交修改。无需重新创建仓库或重新开启 Pages。若手机看到旧界面，稍等部署完成后重新打开链接，或清理页面缓存后再试。

## 手机上检查这些功能

- 首次进入的启动页和音乐开关；音乐通常需要点击「进入活动」后才能开始播放。
- 顶部 LOGO、KOOK 跳转、主题切换和可展开的音量调节。
- 背景视频能否播放；如无法播放，应显示静态背景封面。
- 活动须知的字体和排版、口令验证、洗月饼、抽奖和中奖弹窗。
- 中奖图片下载；微信内置浏览器可能限制自动下载，请按页面提示保存图片或在系统浏览器打开。

建议用中国大陆手机的 Wi-Fi、移动网络和微信内置浏览器分别实测。使用国内图床外链不能保证 GitHub Pages 本身在大陆的连接速度。

## 上线前注意

- **不要上传明文口令文件**，例如 `codes_private.txt`；但即便不上传明文，浏览器端的代码、概率和校验逻辑仍可被查看或修改。
- GitHub Pages 是静态托管，**无法可靠实现跨设备一次性核销、可信开奖结果及票据验证**。如果活动涉及实际消费与奖品价值，需要服务端处理这些功能，不能仅靠当前页面。
- 中奖票据涉及设备、地区等信息时，请向参与者说明用途，并只保留必要的信息。地区查询可能依赖第三方服务，失败时应允许显示未知地区。
- 外链素材若过期、被删除或禁止跨站引用，页面会受到影响；部署后务必核对三条外链。
- GitHub Pages 的使用限制需要事先确认。若网站主要用于经营交易，应选用符合其条款的正式商业托管服务。

---

Made by akihowaito@2026
