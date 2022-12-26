/*#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]
*/

mod view;

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
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            view::encoding::encoding_encode,
            view::encoding::encoding_decode,
            view::time::time_generate
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
