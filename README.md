# IDBuilder

> 基于 TAURI 开发的一个服务于 Thaumy 日常工作的小工具，用于规范化基础设施工作流。

<div align=center><img src="appshot.png" style="width: 100%; max-width: 800px"></div>

## 涵盖功能（IDBuilder6）

### 标识

* UUID 生成
* palaflake 生成
* 字符串、数字的随机生成

### 时间

支持UTC时区调整的：

* ISO 8601 时间字符串生成
* 秒级及毫秒级时间戳生成

### 数字签名

* MD5、SHA1及SHA256

### 密码学

* 512～8192 位 RSA 密钥对派生
* PKCS#1 或 PKCS#1 OAEP 填充下的 RSA 加解密

### 编码

* 大小写互转换
* HEX 字符串互转换
* Base64 互转换

## 旧版本注意事项

* IDBuilder5
  * 该版本使用 .NET6 + F# + JS + Electron 开发，故需要 .NET6 运行时。
  * idb5-server
    * 需要 [WebSocketer](https://github.com/Thaumy/WebsSocketer) 依赖  
    * 需要 [pilipala.util](https://github.com/Thaumy/pilipala-fs) 依赖  
    * 默认占用20222端口用作前后端通信
* IDBuilder4
  * 该版本使用 .NET5 + C# + JS + Electron 开发，故需要 .NET5 运行时。
  * 需要 WaterLibrary 1.1.7 - Yuki 依赖。如有缺失，请自行到我的相应repo中下载并编译。
* IDBuilder3
  * 使用UWP构建，由于Windows商店许可证等问题，需要在本地环境中编译后使用。
* IDBuilder1与IDBuilder2
  * 使用WPF构建，过时的版本，不建议使用。
