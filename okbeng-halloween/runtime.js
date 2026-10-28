// 部署配置（不参与混淆，部署后可直接改这个文件，不用重新构建）
//
// 预览：mode: 'demo'  —— 不连后端，数据只保存在当前浏览器，凭证带「预览」水印，不能兑奖
// 正式：mode: 'live', api: 'https://你的后端域名'  —— 例如 https://okbeng.akihowaito.cn
//       如果页面本身就由后端服务托管（同一个域名），api 留空即可
window.OKB_RUNTIME = { mode: 'live', api: 'https://okbeng-halloween.akihowaito.cn' };
