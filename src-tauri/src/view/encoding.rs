pub fn call(str: &str, mode: &str) -> String {
    match mode {
        "to_upper" => str.to_uppercase(),
        "to_lower" => str.to_lowercase(),
        _ => "".to_string()
    }
}