// For more information see https://aka.ms/fsharp-console-apps

open System
open System.Text
open System.Text.RegularExpressions
open System.Net
open System.Net.Sockets
open System.Security.Cryptography
open System.Threading

open WebSocketer
open WebSocketer.Server

open idb5_server.IdView

let f (ws: WebSocket) =
    let isConnected =
        try
            ws.socket.Send(Array.zeroCreate<byte> 0) |> ignore
            true
        with
        | _ -> false

    while isConnected do
        let msg = ws.recv ()
        Console.WriteLine msg

        if msg.StartsWith "get_id_view_data" then
            gen 1uy 2022us |> ws.send

    Console.WriteLine "closed"

listen 20222us f |> ignore
