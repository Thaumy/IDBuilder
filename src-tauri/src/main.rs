/*#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]
*/

mod view;

use ruster::functional::monad::MonadExt;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let enable_dbg = true;
                if enable_dbg {
                    let window = app.get_window("main").unwrap();
                    window.open_devtools();
                    window.close_devtools();
                }
            }
            ().unit_to()
        })
        .invoke_handler(tauri::generate_handler![
            view::id::id_generate,
            view::hash::hash_compute,
            view::time::time_generate,
            view::crypto::crypto_encrypt,
            view::crypto::crypto_decrypt,
            view::crypto::crypto_generate,
            view::encoding::encoding_encode,
            view::encoding::encoding_decode,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
