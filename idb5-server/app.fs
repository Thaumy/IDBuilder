// For more information see https://aka.ms/fsharp-console-apps

open System
open System.Text
open WebSocketer
open WebSocketer.Server

open idb5_server.IdView
open idb5_server.TimeView
open idb5_server.HashView
open idb5_server.CryptoView
open idb5_server.EncodingView

Console.WriteLine "Welcome to IDBuilder server."


let decodeBase64 (base64: string) =
    base64
    |> Convert.FromBase64String
    |> Encoding.UTF8.GetString

let f (ws: WebSocket) =
    Console.WriteLine "New client online."

    while true do
        Console.WriteLine "Waiting for request."
        let msg = ws.recv ()
        Console.WriteLine msg

        let argv = msg.Split(" ")

        if msg.StartsWith "get_id_view_data" then
            let palaflake_machine_id = argv.[1] |> Convert.ToByte
            let palaflake_start_year = argv.[2] |> Convert.ToUInt16

            genIdViewData palaflake_machine_id palaflake_start_year
            |> ws.send

        if msg.StartsWith "get_time_view_data" then
            let utc_plus = argv.[1] |> Convert.ToInt32
            genTimeViewData utc_plus |> ws.send

        if msg.StartsWith "get_hash_view_data" then
            let encrypt_algh = argv.[1]
            let base64str = argv.[2]
            genHashViewData encrypt_algh base64str |> ws.send

        if msg.StartsWith "get_crypto_view_data" then
            try
                let mode = argv.[1]
                let bitsOrText = argv.[2] |> decodeBase64
                let key = argv.[3] |> decodeBase64
                let paddingMode = argv.[4]

                getCryptoViewData mode bitsOrText key paddingMode
                |> ws.send
            with
            | e -> Console.WriteLine(e.ToString())

        if msg.StartsWith "get_encoding_view_data" then
            let mode = argv.[1]
            let algh = argv.[2]
            let base64str = argv.[3]
            genEncodingViewData mode algh base64str |> ws.send

listen 20222us f |> ignore
