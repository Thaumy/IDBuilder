mod view;

#[tauri::command]
fn encoding_call(str: String, mode: String) -> String {
    view::encoding::call(&str, &mode)
}

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![encoding_call])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
