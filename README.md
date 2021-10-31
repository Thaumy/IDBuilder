# IDBuilder

> 一个服务于Thaumy日常工作的小工具，用于文字解转码和密码学工作。

## 涵盖功能（IDBuilder4）

* UUID生成（MS-GUID N型或D型）
* 为年月日命名而设计的字符串生成
* SHA1签名
* MD5签名
* RSA2048 PEM（公钥PKCS1，私钥PKCS8）
  * 密钥对生成
  * 加密/解密

## 注意事项

* IDBuilder4
  * 出于跨平台和减轻重构复杂度的考量，该版本使用.NET5和Electron混合开发，故需要.NET5运行时。
  * 需要 WaterLibrary 1.1.7 - Yuki 依赖。如有缺失，请自行到我的相应repo中下载并编译。
* IDBuilder3
  * 使用UWP构建，由于Windows商店许可证等问题，需要在本地环境中编译后使用。
* IDBuilder1与IDBuilder2
  * 使用WPF构建，过时的版本，不建议使用。

## 许可证

The MIT License (MIT)
Copyright © 2021 Thaumy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
