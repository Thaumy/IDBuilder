use crypto::md5;
use crypto::md5::Md5;
use crypto::sha1::Sha1;
use crypto::sha2::Sha256;
use bcrypt::DEFAULT_COST;
use crypto::digest::Digest;

use ruster::ext::result;
use ruster::ext::result::ResultExt;
use ruster::functional::monad;
use ruster::functional::monad::MonadExt;

#[tauri::command]
pub fn hash_compute(text: &str, hash_mode: &str) -> Result<String, String> {
    match hash_mode {
        "md5" => {
            let mut h = Md5::new();
            h.input(text.as_ref());
            h.result_str().unit_to()
        }
        "sha1" => {
            let mut h = Sha1::new();
            h.input(text.as_ref());
            h.result_str().unit_to()
        }
        "sha256" => {
            let mut h = Sha256::new();
            h.input(text.as_ref());
            h.result_str().unit_to()
        }
        "bcrypt" => {
            bcrypt::hash(text, DEFAULT_COST)
                .unwrap_or_eval(|e| e.to_string())
                .unit_to()
        }
        _ => Err("Err: invalid mode".to_string())
    }
}
