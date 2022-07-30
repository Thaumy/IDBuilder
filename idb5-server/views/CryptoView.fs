module idb5_server.CryptoView

open System
open System.Text
open System.Security.Cryptography

let getBytes (str: string) = Encoding.UTF8.GetBytes str

type String with
    /// 转换到16进制字符串
    member self.hex = self |> getBytes |> Convert.ToHexString
    /// 转换到base64字符串
    member self.base64 = self |> getBytes |> Convert.ToBase64String

let decodeBase64 (base64: string) =
    base64
    |> Convert.FromBase64String
    |> Encoding.UTF8.GetString

/// 加密明文
let encrypt (pubKey: string) (paddingMode: RSAEncryptionPadding) (plainText: string) =
    let csp = new RSACryptoServiceProvider()
    csp.ImportFromPem pubKey
    let plainBytes = plainText |> Encoding.UTF8.GetBytes

    let cipherBytes = csp.Encrypt(plainBytes, paddingMode)

    cipherBytes |> Convert.ToBase64String

/// 解密密文
let decrypt (priKey: string) (paddingMode: RSAEncryptionPadding) (cipherText: string) =
    let csp = new RSACryptoServiceProvider()
    csp.ImportFromPem priKey
    let cipherBytes = cipherText |> Convert.FromBase64String

    let plainBytes = csp.Decrypt(cipherBytes, paddingMode)

    plainBytes |> Encoding.UTF8.GetString

/// 生成RSA密钥对
let genRsaKeyPair (keySize: uint16) =
    let csp = new RSACryptoServiceProvider(int keySize)

    let priKey =
        csp.ExportPkcs8PrivateKey()
        |> Convert.ToBase64String

    let pubKey =
        csp.ExportSubjectPublicKeyInfo()
        |> Convert.ToBase64String

    let rec breakToLines (key: string) start len =
        if start + len < key.Length then
            $"{key.Substring(start, len)}\n{breakToLines key (start + len) len}"
        elif start + len > key.Length then
            breakToLines key start (key.Length - start)
        else //start + len = key.Length
            key.Substring(start, len)

    {| priKey = $"-----BEGIN PRIVATE KEY-----\n{breakToLines priKey 0 64}\n-----END PRIVATE KEY-----"
       pubKey = $"-----BEGIN PUBLIC KEY-----\n{breakToLines pubKey 0 64}\n-----END PUBLIC KEY-----" |}

let getCryptoViewData mode bitOrText key paddingMode =
    try
        match mode, bitOrText, key, paddingMode with
        | "gen_key", bits: string, _, _ ->
            let keyPair = bits |> Convert.ToUInt16 |> genRsaKeyPair

            $"{{
            \"priKey\":\"{keyPair.priKey.base64}\",
            \"pubKey\":\"{keyPair.pubKey.base64}\"
          }}"
        | "encrypt", plain, pubKey, "pkcs1_padding" ->
            let cipher = plain |> encrypt pubKey RSAEncryptionPadding.Pkcs1

            $"{{\"result\":\"{cipher.base64}\"}}"

        | "encrypt", plain, pubKey, "pkcs1_oaep_padding" ->
            let cipher =
                plain
                |> encrypt pubKey RSAEncryptionPadding.OaepSHA1

            $"{{\"result\":\"{cipher.base64}\"}}"

        | "decrypt", cipher, priKey, "pkcs1_padding" ->
            let plain =
                cipher
                |> decrypt priKey RSAEncryptionPadding.Pkcs1

            $"{{\"result\":\"{plain.base64}\"}}"

        | "decrypt", cipher, priKey, "pkcs1_oaep_padding" ->
            let plain =
                cipher
                |> decrypt priKey RSAEncryptionPadding.OaepSHA1

            $"{{\"result\":\"{plain.base64}\"}}"
        | _ -> ""
    with
    | _ ->
        //ERR in base64 is RVJS
        """{
                "priKey":"RVJS",\
                "pubKey":"RVJS",\
                "result":"RVJS"\
           }"""
