module idb5_server.TimeView

open System

let genTimeViewData utc_plus =
    let utcNow = DateTime.UtcNow

    let span =
        utcNow
        - DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)

    let sec_timestamp =
        int span.TotalSeconds + utc_plus * 60 * 60

    let milis_timestamp =
        Convert.ToInt64 span.TotalMilliseconds
        + int64 (utc_plus * 1000 * 60 * 60)
    //2021-02-08 20:30:20
    let db_time_format =
        utcNow
            .AddHours(utc_plus)
            .ToString("yyyy-MM-dd HH:mm:ss")


    $"{{\
            \"sec_timestamp\":\"{sec_timestamp}\",\
            \"mili_timestamp\":\"{milis_timestamp}\",\
            \"db_time_format\":\"{db_time_format}\"\
    }}"
