module idb5_server.HashView

open System
open System.Text
open System.Security.Cryptography
open Microsoft.IdentityModel.Tokens

type private Object with
    /// 转换到指定哈希算法的字符串
    member self.hash(hasher: HashAlgorithm) =
        let bytes =
            self
            |> Convert.ToString
            |> Encoding.Default.GetBytes //转换成字节数组
            |> hasher.ComputeHash

        let builder = StringBuilder() //用于收集字节

        for byte in bytes do
            byte.ToString "X2" //格式每一个十六进制字符串
            |> builder.Append
            |> ignore

        builder.ToString().ToLower()

    /// 转换到 md5 字符串
    member self.md5 = MD5.Create() |> self.hash
    /// 转换到 sha1 字符串
    member self.sha1 = SHA1.Create() |> self.hash

    /// 转换到 sha256 字符串
    member self.sha256 =
        SHA256.Create() |> self.hash

let getBytes (str: string) = Encoding.UTF8.GetBytes str


/// 解码base64
let decodeBase64 (base64: string) =
    base64
    |> Convert.FromBase64String
    |> Encoding.UTF8.GetString

let genHashViewData encrypt_algh base64str =
    let decoded = base64str |> decodeBase64

    let hash =
        match encrypt_algh with
        | "md5" -> decoded.md5
        | "sha1" -> decoded.sha1
        | _ -> //sha256
            decoded.sha256

    $"{{
        \"hash\":\"{hash}\"
    }}"
