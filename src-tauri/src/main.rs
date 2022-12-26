mod view;

use tauri::Manager;


fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let enable_dbg = false;
                if enable_dbg {
                    let window = app.get_window("main").unwrap();
                    window.open_devtools();
                    window.close_devtools();
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            view::encoding::encode,
            view::encoding::decode
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
