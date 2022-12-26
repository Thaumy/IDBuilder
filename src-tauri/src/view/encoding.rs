/*#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]
*/
use base64;
use std::str;
use hex::ToHex;

#[tauri::command]
pub fn encode(decoded: &str, mode: &str) -> String {
    match mode {
        "hex" => hex::encode(decoded),
        "upper" => decoded.to_uppercase(),
        "lower" => decoded.to_lowercase(),
        "base64" => base64::encode(decoded),
        _ => "Err: invalid mode".into()
    }
}

#[tauri::command]
pub fn decode(encoded: &str, mode: &str) -> String {
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
        Ok(s) => s,
        Err(e) => "Err: invalid utf-8 string"
    }.into()
}
