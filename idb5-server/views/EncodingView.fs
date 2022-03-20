module idb5_server.EncodingView

open System
open System.Text

/// 解码16进制字符串
let decodeHex (hex: string) =
    hex
    |> Convert.FromHexString
    |> Encoding.UTF8.GetString

/// 解码base64
let decodeBase64 (base64: string) =
    base64
    |> Convert.FromBase64String
    |> Encoding.UTF8.GetString

let getBytes (str: string) = Encoding.UTF8.GetBytes str

type String with
    /// 转换到16进制字符串
    member self.hex = self |> getBytes |> Convert.ToHexString
    /// 转换到base64字符串
    member self.base64 =
        self |> getBytes |> Convert.ToBase64String

let genEncodingViewData mode algh base64str =
    let decoded = base64str |> decodeBase64

    let result =
        try
            match mode, algh with
            | _, "upper" -> decoded.ToUpper()
            | _, "lower" -> decoded.ToLower()
            | "encode", "base64" -> decoded.base64
            | "encode", "hex" -> decoded.hex
            | "decode", "base64" -> decoded |> decodeBase64
            | "decode", "hex" -> decoded |> decodeHex
            | _ -> "ERR"
        with
        | _ -> "ERR"

    $"{{
        \"result\":\"{result}\"
    }}"
