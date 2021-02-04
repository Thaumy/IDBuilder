# IDBuilder

IDBuilder是一个服务于Thaumy日常工作的小工具。

### 事项

出于跨平台和减轻重构复杂度的考虑，IDBuilder4使用.NET5和Electron混合开发，故需要.NET5运行时。
IDBuilder3使用UWP构建，由于Windows商店许可证问题，需在使用环境中编译后使用。

### 功能

* UUID生成(MS-GUID N型或D型)
* 为年月日命名而设计的字符串生成
* SHA1加密
* MD5加密
* RSA操作(2048位，可定制)：
  * Pem格式下的RSA密钥对生成
  * Pem格式下的RSA加密/解密
