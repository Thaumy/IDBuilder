use std::str;

use base64;
use base64::Engine;

#[tauri::command]
pub fn encoding_encode(
    decoded: &str,
    mode: &str
) -> Result<String, String> {
    match mode {
        "hex" => Ok(hex::encode(decoded)),
        "upper" => Ok(decoded.to_uppercase()),
        "lower" => Ok(decoded.to_lowercase()),
        "base64" => {
            let base64 = base64::engine::general_purpose::STANDARD
                .encode(decoded);
            Ok(base64)
        }
        _ => Err("Err: invalid mode".to_string())
    }
}

#[tauri::command]
pub fn encoding_decode(
    encoded: &str,
    mode: &str
) -> Result<String, String> {
    let vec_u8 = match mode {
        "hex" => hex::decode(encoded)
            .unwrap_or(Vec::from("Err: hex decode failed")),
        "upper" => encoded.to_lowercase().into(),
        "lower" => encoded.to_uppercase().into(),
        "base64" => base64::engine::general_purpose::STANDARD
            .decode(encoded)
            .unwrap_or(Vec::from("Err: base64 decode failed")),
        _ => "Err: invalid mode".into()
    };
    match str::from_utf8(vec_u8.as_slice()) {
        Ok(s) => Ok(s.to_string()),
        Err(e) => Err(format!("Err: {e:?} (invalid utf-8 string)"))
    }
}
