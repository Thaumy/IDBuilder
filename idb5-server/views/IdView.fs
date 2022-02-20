module idb5_server.IdView

open System
open System.Text
open System.Collections
open palaflake

let genRnd len (dic: char []) =
    let rnd = Random(int DateTime.Now.Ticks)


    [| for _ in [ 1 .. len ] do
           dic.[rnd.Next(0, dic.Length - 1)] |]
    |> String



let genIdViewData palaflake_machine_id palaflake_start_year : string =

    let uuid = Guid.NewGuid().ToString("D")

    let ymd =
        let now = DateTime.Now
        //时间补位
        let year = now.Year.ToString().PadLeft(2, '0')

        let month =
            Convert.ToString(now.Month).PadLeft(2, '0')

        let day =
            Convert.ToString(now.Day).PadLeft(2, '0')

        let hour =
            Convert.ToString(now.Hour).PadLeft(2, '0')

        let minute =
            Convert.ToString(now.Minute).PadLeft(2, '0')

        year + month + day + hour + minute

    let ymd_xxxx = ymd + "_" + uuid.Substring(0, 4)

    let palaflake =
        Generator(palaflake_machine_id, palaflake_start_year)
            .Next()

    let rnd_number =
        genRnd 12 [| '0'; '1'; '2'; '3'; '4'; '5'; '6'; '7'; '8'; '9' |]

    let rnd_string =
        genRnd
            12
            [| '1'
               '2'
               '3'
               '4'
               '5'
               '6'
               '7'
               '8'
               '9'
               'a'
               'b'
               'c'
               'd'
               'e'
               'f'
               'g'
               'h'
               'i'
               'j'
               'k'
               'm'
               'n'
               'p'
               'q'
               'r'
               's'
               't'
               'u'
               'v'
               'w'
               'x'
               'y'
               'z'
               'A'
               'B'
               'C'
               'D'
               'E'
               'F'
               'G'
               'H'
               'J'
               'K'
               'L'
               'M'
               'N'
               'P'
               'Q'
               'R'
               'S'
               'T'
               'U'
               'V'
               'W'
               'X'
               'Y'
               'Z' |]

    $"{{\
            \"uuid\":\"{uuid}\",\
       \"palaflake\":\"{palaflake}\",\
             \"ymd\":\"{ymd}\",\
        \"ymd_xxxx\":\"{ymd_xxxx}\",\
      \"rnd_number\":\"{rnd_number}\",\
      \"rnd_string\":\"{rnd_string}\"\
      }}"
