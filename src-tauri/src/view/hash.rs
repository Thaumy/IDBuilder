use crypto::digest::Digest;
use crypto::md5;
use crypto::md5::Md5;
use crypto::sha1::Sha1;
use crypto::sha2::Sha256;

#[tauri::command]
pub fn hash_compute(text: &str, hash_mode: &str) -> Result<String, String> {
    match hash_mode {
        "md5" => {
            let mut h = Md5::new();
            h.input(text.as_ref());
            Ok(h.result_str())
        }
        "sha1" => {
            let mut h = Sha1::new();
            h.input(text.as_ref());
            Ok(h.result_str())
        }
        "sha256" => {
            let mut h = Sha256::new();
            h.input(text.as_ref());
            Ok(h.result_str())
        }
        _ => Err("Err: invalid mode".to_string())
    }
}
