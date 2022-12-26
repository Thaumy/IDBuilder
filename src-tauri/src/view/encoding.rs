use base64;
use std::str;
use hex::ToHex;

#[tauri::command]
pub fn encoding_encode(decoded: &str, mode: &str) -> Result<String, String> {
    match mode {
        "hex" => Ok(hex::encode(decoded)),
        "upper" => Ok(decoded.to_uppercase()),
        "lower" => Ok(decoded.to_lowercase()),
        "base64" => Ok(base64::encode(decoded)),
        _ => Err("Err: invalid mode".to_string())
    }
}

#[tauri::command]
pub fn encoding_decode(encoded: &str, mode: &str) -> Result<String, String> {
    let vec_u8 = match mode {
        "hex" =>
            hex::decode(encoded)
                .unwrap_or(Vec::from("Err: hex decode failed")),
        "upper" => encoded.to_lowercase().into(),
        "lower" => encoded.to_uppercase().into(),
        "base64" =>
            base64::decode(encoded)
                .unwrap_or(Vec::from("Err: base64 decode failed")),
        _ => "Err: invalid mode".into()
    };
    match str::from_utf8(vec_u8.as_slice()) {
        Ok(s) => Ok(s.to_string()),
        Err(e) => Err("Err: invalid utf-8 string".to_string())
    }
}
