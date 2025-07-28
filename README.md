# 百度AI Studio API代理扩展

## 📦 安装方法

### 1. 解压文件
- 访问项目仓库，点击绿色的 "Code" 按钮
- 选择 "Download ZIP" 下载仓库压缩包
- 右键点击下载的 `baidu-aistudio-api-proxy.zip` 文件 → 选择"解压到当前文件夹"
- 解压后会得到一个 `baidu-aistudio-api-proxy` 文件夹

### 2. 安装扩展
1. 打开 Chrome 浏览器
2. 地址栏输入 `chrome://extensions/` 并回车
3. 右上角的"开发者模式"开关打开
4. 点击"加载已解压的扩展程序"
5. 选择解压后的 `baidu-aistudio-api-proxy` 文件夹
6. 安装完成！扩展图标会出现在浏览器右上角

## 🧠 实现原理

百度飞桨本身提供了 `aistudio.baidu.com/地区/user/用户id/项目id/api_serving/{端口号}` 用于对外网映射端口的功能。

然而，大部分项目不会将项目内的链接写成硬路径，而是使用相对路径，这就导致 `0.0.0.0:端口号/xxx.js` 没有映射到 `aistudio.baidu.com/地区/user/用户id/项目id/api_serving/{端口号}/xxx.js`，而是直接变成 `aistudio.baidu.com/xxx.js`，使得该接口无法正常使用。

本插件的作用就是将这些错误的链接重定向为正确的链接，从而修复这个问题。

