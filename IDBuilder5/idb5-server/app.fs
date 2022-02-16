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
    while true do
        let msg = ws.recv ()
        Console.WriteLine msg

        if msg.StartsWith "get_id_view_data" then
            let argv = msg.Split(" ")
            let palaflake_machine_id = argv.[1] |> Convert.ToByte
            let palaflake_start_year = argv.[2] |> Convert.ToUInt16

            gen palaflake_machine_id palaflake_start_year
            |> ws.send

    Console.WriteLine "closed"

listen 20222us f |> ignore
