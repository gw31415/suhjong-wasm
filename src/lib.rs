use wasm_bindgen::prelude::*;
#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn test() {
        let eqns = best_equations('9', '8', '7', '6', '5').unwrap_or("".to_string());
        let last_eqn = eqns.split(EQN_SPLIT).last().unwrap();
        assert_eq!(calc_equation(last_eqn.to_owned()).unwrap_or(0), 96);
    }
}

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use suhjong::{check, maximum_score, ErrorCode, Num};

const EQN_SPLIT: &'static str = ";";

/// カード(ASCII文字、`$\d^`)5枚を引数に取り、
/// 最大のスコアを与える等式を';'区切りで出力します。
#[wasm_bindgen]
pub fn best_equations(a: char, b: char, c: char, d: char, e: char) -> Result<String, JsError> {
    for c in [&a, &b, &c, &d, &e] {
        if !c.is_ascii_digit() {
            return Err(JsError::new(&format!(
                "Suhjong ERROR: b'{}' is not allowed as a Char of cards.",
                c
            )));
        }
    }
    let cards = [a as u8, b as u8, c as u8, d as u8, e as u8];
    let (_, eqns) = maximum_score(cards);
    Ok(eqns.into_iter().collect::<Vec<_>>().join(EQN_SPLIT))
}

/// 数雀文字列を計算します。
/// 数雀文字列が正しくないときはエラーがスローされます。
#[wasm_bindgen]
pub fn calc_equation(equation: String) -> Result<Num, JsError> {
    use ErrorCode::*;
    match check(equation.into_bytes()) {
        Ok(n) => Ok(n),
        Err(e) => Err(JsError::new(&format!("Suhjong ERROR: {}", match e {
            ValueMismatch => "The numbers on both sides do not match.",
            Math => "A mathematical error occurred.",
            Overflow => "Overflow occurred.",
            Parse => "Syntax Error.",
            MultipleEquals => "Multiple equal signs found.",
            NoEquals => "No equal sign found.",
            UndefinedCharacter => "Character not defined for operation.",
            NumCountAgainstRules => "Number of digits is against the rules.",
            HighestRankZero => "Zero is not allowed in the highest position of multi-digit number in rank notation.",
        }))),
    }
}
