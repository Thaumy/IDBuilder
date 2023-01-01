use std::str;
use std::ops::Deref;

use sha2::Sha256;
use rsa::{PublicKey, RsaPrivateKey, RsaPublicKey, PaddingScheme};
use rsa::pkcs1::{DecodeRsaPublicKey, EncodeRsaPublicKey};
use rsa::pkcs1::LineEnding::LF;
use rsa::pkcs8::{DecodePrivateKey, EncodePrivateKey};

use ruster::functional::monad;
use ruster::functional::monad::MonadExt;

#[derive(serde::Serialize)]
pub struct CryptoViewData {
    pub_key: String,
    pri_key: String,
    plain_text: String,
    cipher_text: String,
}

#[tauri::command]
pub fn crypto_generate(bits: &str) -> Result<CryptoViewData, String> {
    let mut rng = rand::thread_rng();

    match bits.parse::<usize>() {
        Ok(bits) => {
            let pri_key = RsaPrivateKey::new(&mut rng, bits);
            match pri_key {
                Ok(pri_key) =>
                    CryptoViewData {
                        pub_key:
                        RsaPublicKey::from(&pri_key)
                            .to_pkcs1_pem(LF)
                            .unwrap_or("Err: failed to export pkcs1 pem pub key".to_string()),
                        pri_key: pri_key.to_pkcs8_pem(LF).unwrap().deref().as_str().to_string(),
                        plain_text: "".to_string(),
                        cipher_text: "".to_string(),
                    }.unit_to(),
                Err(e) => Err("Err: failed to generate a key".to_string())
            }
        }
        Err(_) => Err("Err: bits parse failed".to_string())
    }
}

#[tauri::command]
pub fn crypto_encrypt(plain: &str, pub_key: &str, padding_mode: &str) -> Result<String, String> {
    let mut rng = rand::thread_rng();
    match RsaPublicKey::from_pkcs1_pem(pub_key) {
        Ok(pub_key) => {
            let padding = match padding_mode {
                "pkcs1_oaep_padding" => PaddingScheme::new_oaep::<Sha256>(),
                "pkcs1_padding" => PaddingScheme::new_pkcs1v15_encrypt(),
                _ => return Err("Err: invalid padding_mode".to_string())
            };

            match pub_key.encrypt(&mut rng, padding, plain.as_ref()) {
                Ok(vec_u8) => Ok(base64::encode(vec_u8.as_slice())),
                Err(_) => Err("Err: failed to encrypt".to_string())
            }
        }
        Err(_) => Err("Err: failed to parse pub key".to_string())
    }
}

#[tauri::command]
pub fn crypto_decrypt(cipher: &str, pri_key: &str, padding_mode: &str) -> Result<String, String> {
    match RsaPrivateKey::from_pkcs8_pem(pri_key) {
        Ok(pri_key) => {
            let padding = match padding_mode {
                "pkcs1_oaep_padding" => PaddingScheme::new_oaep::<Sha256>(),
                "pkcs1_padding" => PaddingScheme::new_pkcs1v15_encrypt(),
                _ => return Err("Err: invalid padding_mode".to_string())
            };

            match base64::decode(cipher) {
                Ok(cipher) =>
                    match pri_key.decrypt(padding, cipher.as_ref()) {
                        Ok(vec_u8) =>
                            str::from_utf8(&*vec_u8)
                                .unwrap_or("Err: failed to parse vec_u8 to utf8 str")
                                .to_string()
                                .unit_to(),
                        Err(_) => Err("Err: failed to decrypt".to_string())
                    },
                Err(_) => Err("Err: invalid base64 cipher text".to_string())
            }
        }
        Err(_) => Err("Err: failed to parse pri key".to_string())
    }
}
