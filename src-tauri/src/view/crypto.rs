use std::ops::Deref;
use std::str;

use rsa::pkcs1::LineEnding::LF;
use rsa::pkcs1::{DecodeRsaPublicKey, EncodeRsaPublicKey};
use rsa::pkcs8::{DecodePrivateKey, EncodePrivateKey};
use rsa::traits::PaddingScheme;
use rsa::{Oaep, Pkcs1v15Encrypt, RsaPrivateKey, RsaPublicKey};
//use rsa::{PaddingScheme, PublicKey, RsaPrivateKey, RsaPublicKey};
use ruster::functional::monad::MonadExt;
use sha2::Sha256;

#[derive(serde::Serialize)]
pub struct CryptoViewData {
    pub_key: String,
    pri_key: String,
    plain_text: String,
    cipher_text: String
}

#[tauri::command]
pub fn crypto_generate(bits: &str) -> Result<CryptoViewData, String> {
    let mut rng = rand::thread_rng();

    match bits.parse::<usize>() {
        Ok(bits) => {
            let pri_key = RsaPrivateKey::new(&mut rng, bits);
            match pri_key {
                Ok(pri_key) => CryptoViewData {
                    pub_key: RsaPublicKey::from(&pri_key)
                        .to_pkcs1_pem(LF)
                        .unwrap_or(
                            "Err: failed to export pkcs1 pem pub key"
                                .to_string()
                        ),
                    pri_key: pri_key
                        .to_pkcs8_pem(LF)
                        .unwrap()
                        .deref()
                        .as_str()
                        .to_string(),
                    plain_text: "".to_string(),
                    cipher_text: "".to_string()
                }
                .unit_to(),
                Err(e) => Err(format!(
                    "Err: {e:?} (failed to generate a key)"
                ))
            }
        }
        Err(_) => Err("Err: bits parse failed".to_string())
    }
}

#[tauri::command]
pub fn crypto_encrypt(
    plain: &str,
    pub_key: &str,
    padding_mode: &str
) -> Result<String, String> {
    fn encrypt(
        pub_key: RsaPublicKey,
        plain: &str,
        padding: impl PaddingScheme
    ) -> Result<String, String> {
        let mut rng = rand::thread_rng();
        match pub_key.encrypt(&mut rng, padding, plain.as_ref()) {
            Ok(vec_u8) => Ok(base64::encode(vec_u8.as_slice())),
            Err(_) => Err("Err: failed to encrypt".to_string())
        }
    }

    match RsaPublicKey::from_pkcs1_pem(pub_key) {
        Ok(pub_key) => match padding_mode {
            "pkcs1_oaep_padding" => {
                let padding = Oaep::new::<Sha256>();
                encrypt(pub_key, plain, padding)
            }
            "pkcs1_padding" => {
                let padding = Pkcs1v15Encrypt::default();
                encrypt(pub_key, plain, padding)
            }
            _ => return Err("Err: invalid padding_mode".to_string())
        },
        Err(_) => Err("Err: failed to parse pub key".to_string())
    }
}

#[tauri::command]
pub fn crypto_decrypt(
    cipher: &str,
    pri_key: &str,
    padding_mode: &str
) -> Result<String, String> {
    fn decrypt(
        pri_key: RsaPrivateKey,
        cipher: Vec<u8>,
        padding: impl PaddingScheme
    ) -> Result<String, String> {
        match pri_key.decrypt(padding, cipher.as_ref()) {
            Ok(vec_u8) => str::from_utf8(&*vec_u8)
                .unwrap_or("Err: failed to parse vec_u8 to utf8 str")
                .to_string()
                .unit_to(),
            Err(_) => Err("Err: failed to decrypt".to_string())
        }
    }
    match RsaPrivateKey::from_pkcs8_pem(pri_key) {
        Ok(pri_key) => match base64::decode(cipher) {
            Ok(cipher) => match padding_mode {
                "pkcs1_oaep_padding" => {
                    let padding = Oaep::new::<Sha256>();
                    decrypt(pri_key, cipher, padding)
                }
                "pkcs1_padding" => {
                    let padding = Pkcs1v15Encrypt::default();
                    decrypt(pri_key, cipher, padding)
                }
                _ =>
                    return Err(
                        "Err: invalid padding_mode".to_string()
                    ),
            },
            Err(_) =>
                Err("Err: invalid base64 cipher text".to_string()),
        },
        Err(_) => Err("Err: failed to parse pri key".to_string())
    }
}
