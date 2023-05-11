use chrono::prelude::Utc;
use chrono::FixedOffset;
use ruster::functional::monad::MonadExt;

#[derive(serde::Serialize)]
pub struct TimeViewData {
    sec: String,
    milli: String,
    iso8601: String
}

#[tauri::command]
pub fn time_generate(offset: String) -> Result<TimeViewData, String> {
    match offset.parse::<i32>() {
        Ok(offset) => {
            let tz = if offset > 0 {
                FixedOffset::east_opt(3600 * offset)
            } else {
                FixedOffset::west_opt(3600 * -offset)
            }
            .unwrap();

            let utc_now = Utc::now().with_timezone(&tz);

            let sec = utc_now.timestamp();
            let milli = utc_now.timestamp_millis();

            TimeViewData {
                sec: sec.to_string(),
                milli: milli.to_string(),
                iso8601: utc_now
                    .format("%+")
                    .to_string()
            }
            .unit_to()
        }
        Err(_) => Err("Err: offset parse failed".to_string())
    }
}
