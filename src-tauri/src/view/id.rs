use chrono::Utc;
use crypto::digest::Digest;
use crypto::sha2::Sha256;
use palaflake::Generator;
use rand::rngs::StdRng;
use rand::{thread_rng, Rng, SeedableRng};
use ruster::functional::monad::MonadExt;
use uuid::Uuid;

#[derive(serde::Serialize)]
pub struct IdViewData {
    uuid: String,
    palaflake: String,
    ymd_rand_num: String,
    ymd: String,
    rand_num: String,
    rand_str: String
}

#[tauri::command]
pub fn id_generate(
    pf_mid: &str,
    pf_sy: &str
) -> Result<IdViewData, String> {
    match (pf_mid.parse::<u8>(), pf_sy.parse::<u16>()) {
        (Ok(pf_mid), Ok(pf_sy)) => {
            let mut pf_gen = Generator::new(pf_mid, pf_sy);
            let mut rng = StdRng::from_rng(thread_rng()).unwrap();
            let rand_num =
                (rng.gen_range(0.0..1.0) * 100000000.0) as i32;
            let utc_now = Utc::now();

            IdViewData {
                uuid: Uuid::new_v4().to_string(),
                palaflake: pf_gen.next().to_string(),
                ymd: utc_now
                    .format("%y%m%d")
                    .to_string(),
                ymd_rand_num: format!(
                    "{}_{}",
                    utc_now.format("%y%m%d"),
                    rand_num
                ),
                rand_num: rand_num.to_string(),
                rand_str: {
                    let mut h = Sha256::new();
                    h.input(
                        rand_num
                            .to_string()
                            .as_bytes()
                    );
                    h.result_str()[..8].to_string()
                }
            }
            .unit_to()
        }
        _ => Err("Err: pd_mid or pf_sy parse failed".to_string())
    }
}
